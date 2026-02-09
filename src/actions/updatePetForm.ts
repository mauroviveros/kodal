import pick from 'lodash/pick';
import mapKeys from 'lodash/mapKeys';
import { createClient, createRoot } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { updatePetSchema } from "./schemas";

export default defineAction({
  accept: 'form',
  input: updatePetSchema,
  handler: async ({token_code, avatar_file, ...input}, { request, cookies, params }) => {
    const supabase = createClient(request, cookies);
    const root = createRoot();

    // 1. Preparar payloads de mascota y medalla
    const pet_payload = pick(input, ['id', 'name', 'species', 'gender', 'breed', 'birth_date']);
    const medal_payload = mapKeys(
      pick(input, ['medal_id', 'medal_full_name', 'medal_email', 'medal_phone', 'medal_relation_type']),
      (_, key) => key.replace('medal_', '')
    );

    // 2. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_payload.id) throw new Error("Medal ID mismatch");

    // 3. Verificar el token
    if (!import.meta.env.DISABLE_TOKEN) {
      const token = await supabase
        .from('pet_tokens')
        .select('pet_id')
        .eq('code', token_code)
        .eq('pet_id', pet_payload.id)
        .is('revoked_at', null)
        .gt('expires_at', new Date().toISOString())
        .limit(1)
        .single();
      if (token.error || !token.data) throw new Error("Invalid token");
    }

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

    // 5. Actualizar el formulario de la mascota
    const { data: updated_pet, error: pet_error } = await supabase
      .from('pets')
      .update({
        ...pet_payload,
        avatar_path,
        updated_at: new Date().toISOString(),
      })
      .eq('id', pet_payload.id)
      .eq('medal_id', medal_payload.id)
      .select()
      .single();
    if (pet_error || !updated_pet) throw new Error(`Failed to update pet'}`);

    // 6. Actualizar datos de la medalla si cambiaron
    const { error: update_medal_error } = await root
      .from('medals')
      .update({
        ...medal_payload,
        updated_at: new Date().toISOString()
      })
      .eq('id', medal_payload.id);
    if (update_medal_error) throw new Error("Failed to update medal info");

    // 7. Invalidar el token usado (usa admin para bypassear RLS)
    if (!import.meta.env.DISABLE_TOKEN) {
      const { error: revoke_error } = await root
        .from('pet_tokens')
        .update({ revoked_at: new Date().toISOString() })
        .eq('code', token_code)
        .eq('pet_id', pet_payload.id);
      if (revoke_error) throw new Error("Failed to revoke token");
    }

    return { pet: updated_pet };
  }
});
