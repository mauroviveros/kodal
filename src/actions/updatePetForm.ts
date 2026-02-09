import pick from 'lodash/pick';
import mapKeys from 'lodash/mapKeys';
import { createClient, createRoot } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { updatePetSchema } from "./schemas";

export default defineAction({
  accept: 'form',
  input: updatePetSchema,
  handler: async ({token_code, ...input}, { request, cookies, params }) => {
    const supabase = createClient(request, cookies);
    const root = createRoot();

    // 1. Preparar payloads de mascota y medalla
    const pet_payload = pick(input, ['id', 'name', 'species', 'gender', 'breed', 'birth_date']);
    const medal_payload = mapKeys(
      pick(input, ['medal_full_name', 'medal_email', 'medal_phone', 'medal_relation_type']),
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

    // 4. Actualizar el formulario de la mascota
    const { data: updated_pet, error: pet_error } = await supabase
      .from('pets')
      .update({
        ...pet_payload,
        updated_at: new Date().toISOString(),
      })
      .eq('id', pet_payload.id)
      .eq('medal_id', medal_payload.id)
      .select()
      .single();
    if (pet_error || !updated_pet) throw new Error(`Failed to update pet'}`);

    // 5. Actualizar datos de la medalla si cambiaron
    const { error: update_medal_error } = await root
      .from('medals')
      .update({
        ...medal_payload,
        updated_at: new Date().toISOString()
      })
      .eq('id', medal_payload.id);
    if (update_medal_error) throw new Error("Failed to update medal info");

    // // 5. Subir avatar de la medalla (si viene en el formulario)
    // if (medal_avatar instanceof File && medal_avatar.size > 0) {
    //   const extension = medal_avatar.name.split('.').pop() ?? 'png';
    //   const filePath = `medals/${medal_id}/avatar.${extension}`;

    //   const { error: upload_error } = await root.storage
    //     .from('medal-avatars')
    //     .upload(filePath, medal_avatar, {
    //       upsert: true,
    //       contentType: medal_avatar.type,
    //     });

    //   if (upload_error) throw new Error('Failed to upload medal avatar');

    //   const { data: public_data } = root.storage
    //     .from('medal-avatars')
    //     .getPublicUrl(filePath);

    //   const { error: avatar_update_error } = await root
    //     .from('medals')
    //     .update({ avatar_url: public_data.publicUrl } as never)
    //     .eq('id', medal_id);

    //   if (avatar_update_error) throw new Error('Failed to update medal avatar');
    // }

    // 6. Invalidar el token usado (usa admin para bypassear RLS)
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
