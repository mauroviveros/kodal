import pick from 'lodash/pick';
import mapKeys from 'lodash/mapKeys';
import { createRoot } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { insertPetSchema } from "./schemas";

export default defineAction({
  accept: 'form',
  input: insertPetSchema,
  handler: async ({avatar_file, ...input}, { request, cookies, params }) => {
    const root = createRoot();

    // 1. Preparar payloads de mascota y medalla
    const pet_payload = pick(input, ['id', 'name', 'species', 'gender', 'breed', 'birth_date']);
    const medal_payload = mapKeys(
      pick(input, ['medal_id', 'medal_full_name', 'medal_email', 'medal_phone', 'medal_relation_type']),
      (_, key) => key.replace('medal_', '')
    );

    // 2. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_payload.id) throw new Error("Medal ID mismatch");

    // 3. Verificar que la medalla exista y esté disponible (usa admin para leer cualquier estado)
    const { data: medal, error: medal_error } = await root
      .from('medals')
      .select('id, status')
      .eq('id', medal_payload.id)
      .maybeSingle();
    if (medal_error || !medal) throw new Error("Medal not found");
    if (medal.status !== 'CREATED') throw new Error("Medal is not available for registration");

    // 4. Subir avatar de la medalla (si viene en el formulario)
    let avatar_path: string | null = null;
    if (avatar_file instanceof File && avatar_file.size > 0) {
      const extension = avatar_file.name.split('.').pop() ?? 'png';
      const filePath = `${pet_payload.id}/avatar.${extension}`;

      const { error: upload_error } = await root.storage
        .from('pet_avatars')
        .upload(filePath, avatar_file, {
          upsert: true,
          contentType: avatar_file.type,
        });
      if (upload_error) throw new Error('Failed to upload medal avatar');

      const { data: public_data } = root.storage
        .from('pet_avatars')
        .getPublicUrl(filePath);
      if(public_data.publicUrl) avatar_path = public_data.publicUrl;
    }

    // 4. Insertar la nueva mascota (UNIQUE constraint on medal_id prevents duplicates)
    const { data: pet, error: pet_error } = await root
      .from('pets')
      .insert({
        ...pet_payload,
        medal_id: medal_payload.id,
        avatar_path,
      })
      .select()
      .single();

    if (pet_error || !pet) {
      console.error('Failed to Insert pet:', pet_error);
      throw new Error(`Failed to Insert pet: ${pet_error?.message || 'No data returned'}`);
    }
    // if (pet_error || !pet) throw new Error("Failed to create pet");

    // 5. Actualizar el estado de la medalla a ACTIVE (usa admin para garantizar éxito)
    const { error: update_medal_error } = await root
      .from('medals')
      .update({
        ...medal_payload,
        status: 'ACTIVE',
        updated_at: new Date().toISOString()
      })
      .eq('id', medal_payload.id);
    if (update_medal_error) {
      // Rollback: eliminar el pet si falla activar la medalla
      await root.from('pets').delete().eq('id', pet.id);
      throw new Error("Failed to activate medal");
    }

    return { pet };
  }
});
