import { defineAction } from "astro:actions";
import { updatePetSchema } from "@schemas";
import { checkTokenValidity, deletePet, revokeToken, updateMedal, updatePet } from '@repositories';
import { root } from '@supabase';
import { removePetAvatar, uploadPetAvatar } from '@libs';
import type { Tables } from '@types';
import { buildPetAndMedalPayloads } from '@utils';

export default defineAction({
  accept: 'form',
  input: updatePetSchema,
  handler: async ({token_code, avatar_file, ...input}, { params }) => {
    let avatar_path: string | null = null;
    let pet: Tables<'pets'> | null = null;
    const { pet_payload, medal_payload } = buildPetAndMedalPayloads(input);

    // 1. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_payload.id) {
      console.error('Medal ID mismatch:', { url_medal_id: params.medal_id, form_medal_id: medal_payload.id });
      throw new Error("Medal ID mismatch");
    }

    // 2. Valido obteniendo el token que se usará para la actualización, si no es válido se lanza un error
    await checkTokenValidity(root, { code: token_code, pet_id: pet_payload.id });

    // 3. Subir avatar de la mascota, actualizar la mascota y datos de la medalla
    try{
      if(avatar_file && avatar_file.size) avatar_path = await uploadPetAvatar(root, { file: avatar_file, id: pet_payload.id });
      pet = await updatePet(root, { id: pet_payload.id, medal_id: medal_payload.id, payload: { ...pet_payload, avatar_path }});
      await updateMedal(root, { id: medal_payload.id, payload: { ...medal_payload }});
    } catch(error) {
      if (avatar_path) await removePetAvatar(root, { path: avatar_path });
      if (pet) await deletePet(root, { id: pet.id });
      throw error;
    }

    // 4. Revocar el token utilizado, si falla no bloqueo la acción principal pero informo el error para que se revise
    try{
      await revokeToken(root, { code: token_code, pet_id: pet_payload.id });
    } catch {}

    return { success: true };
  }
});
