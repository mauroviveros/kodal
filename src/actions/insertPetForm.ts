import { defineAction } from "astro:actions";
import { insertPetSchema } from "@schemas";
import { deletePet, insertPet, updateMedal, isValidMedalForRegistration } from '@repositories';
import { root } from '@supabase';
import { removePetAvatar, uploadPetAvatar } from '@libs';
import type { Tables } from '@types';
import { buildPetAndMedalPayloads } from '@utils';

export default defineAction({
  accept: 'form',
  input: insertPetSchema,
  handler: async ({avatar_file, ...input}, { params }) => {
    const { pet_payload, medal_payload } = buildPetAndMedalPayloads(input);

    // 1. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_payload.id) {
      console.error('Medal ID mismatch:', { url_medal_id: params.medal_id, form_medal_id: medal_payload.id });
      throw new Error("Medal ID mismatch");
    }

    // 2. Validar que la medalla existe y está disponible para registro, si no es así se lanza un error
    await isValidMedalForRegistration(root, { id: medal_payload.id });

    let avatar_path: string | null = null;
    let pet: Tables<'pets'> | null = null;

    // 3. Subir avatar de la mascota, crear la mascota y actualizar estado medalla
    try{
      if(avatar_file && avatar_file.size) avatar_path = await uploadPetAvatar(root, { file: avatar_file, id: pet_payload.id });
      pet = await insertPet(root, { payload: { ...pet_payload, medal_id: medal_payload.id, avatar_path }});
      await updateMedal(root, { id: medal_payload.id, payload: { ...medal_payload, status: 'ACTIVE' }});
    } catch(error) {
      if (avatar_path) await removePetAvatar(root, { path: avatar_path });
      if (pet) await deletePet(root, { id: pet.id });
      throw error;
    }

    return { success: true };
  }
});
