import { removePetAvatar, uploadPetAvatar } from "@libs";
import { insertPetSchema } from "@schemas";
import type { Tables } from "@types";
import { buildPetAndMedalPayloads } from "@utils";
import { ActionError, defineAction } from "astro:actions";
import { deletePet, insertPet, updateMedal } from "@repositories";


export const insertPetForm = defineAction({
  accept: 'form',
  input: insertPetSchema,
  handler: async ({ avatar_file, ...input }, { params }) => {
    let avatar_path: string | null | undefined = undefined;
    let pet: Tables<'pets'> | null = null;
    const { pet_payload, medal_payload } = buildPetAndMedalPayloads(input);

    // 1. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_payload.id) {
      console.error('Medal ID mismatch:', { url_medal_id: params.medal_id, form_medal_id: medal_payload.id });
      throw new ActionError({
        code: 'BAD_REQUEST',
        message: 'El ID de la medalla no coincide entre la URL y el formulario',
      });
    }

    // 2. Subir avatar de la mascota, crear la mascota y actualizar estado medalla
    try{
      if (avatar_file && avatar_file.size) avatar_path = await uploadPetAvatar({ file: avatar_file, id: pet_payload.id });
      pet = await insertPet({ payload: { ...pet_payload, medal_id: medal_payload.id, avatar_path } });
      await updateMedal({ id: medal_payload.id, payload: { ...medal_payload, status: 'ACTIVE' } });
    } catch (error) {
      if (avatar_path) await removePetAvatar({ path: avatar_path });
      if (pet) await deletePet({ id: pet.id });

      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Error al insertar la mascota',
      });
    }

    return { success: true };
  }
});
