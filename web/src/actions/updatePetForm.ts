import { removePetAvatar, uploadPetAvatar } from "@libs";
import { getToken, revokeToken, updateMedal, updatePet } from "@repositories";
import { updatePetSchema } from "@schemas";
import type { Tables } from "@types";
import { buildPetAndMedalPayloads } from "@utils";
import { ActionError, defineAction } from "astro:actions";

export const updatePetForm = defineAction({
  accept: 'form',
  input: updatePetSchema,
  handler: async ({ token_code, avatar_file, ...input }, { params }) => {
    let avatar_path: string | null | undefined = undefined;
    let pet: Tables<'pets'> | null = null;
    let medal: Tables<'medals'> | null = null;
    const { pet_payload, medal_payload } = buildPetAndMedalPayloads(input);

    // 1. Validar parámetro de URL medal_id con el del formulario
    if (!params.id || params.id !== medal_payload.id) {
      console.error('Medal ID mismatch:', { url_medal_id: params.id, form_medal_id: medal_payload.id });
      throw new ActionError({
        code: 'BAD_REQUEST',
        message: 'El ID de la medalla no coincide entre la URL y el formulario',
      });
    }

    // 2. Valido obteniendo el token que se usará para la actualización, si no es válido se lanza un error
    const token = await getToken({ code: token_code, pet_id: pet_payload.id });
    if (!token && !import.meta.env.DISABLE_TOKEN) {
      console.error('Invalid or expired token for pet update:', { pet_id: pet_payload.id, token_code });
      throw new ActionError({
        code: 'UNAUTHORIZED',
        message: 'Token inválido o expirado para la actualización de la mascota',
      });
    }

    // 3. Subir nuevo avatar de la mascota, actualizar la mascota y estado de la medalla
    try {
      if (avatar_file && avatar_file.size) avatar_path = await uploadPetAvatar({ file: avatar_file, id: pet_payload.id });
      pet = await updatePet({ id: pet_payload.id, medal_id: medal_payload.id, payload: { ...pet_payload, avatar_path } });
      medal = await updateMedal({ id: medal_payload.id, payload: { ...medal_payload } });
    } catch (error) {
      if (avatar_path) await removePetAvatar({ path: avatar_path });
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Error al actualizar la mascota',
      });
    }

    try {
      await revokeToken({ code: token_code, pet_id: pet_payload.id });
    } catch {}

    return { success: true, medal, pet };
  }
})


// 2. Valido obteniendo el token que se usará para la actualización, si no es válido se lanza un error
