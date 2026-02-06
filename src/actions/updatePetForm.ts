import { createClient, createRoot } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { updatePetSchema } from "./schemas";

export default defineAction({
  accept: 'form',
  input: updatePetSchema,
  handler: async ({token_code, id, medal_id, medal_email, medal_full_name, ...payload}, { request, cookies, params }) => {
    const supabase = createClient(request, cookies);
    const root = createRoot();


    // 1. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_id) throw new Error("Medal ID mismatch");

    // 2. Verificar el token
    const token = await supabase
      .from('pet_tokens')
      .select('pet_id')
      .eq('code', token_code)
      .eq('pet_id', id)
      .is('revoked_at', null)
      .gt('expires_at', new Date().toISOString())
      .limit(1)
      .single();
    if(token.error || !token.data) throw new Error("Invalid token");

    // 3. Actualizar el formulario de la mascota
    const { data: updated_pet, error: pet_error } = await supabase
      .from('pets')
      .update({
        updated_at: new Date().toISOString(),
        ...payload
      })
      .eq('id', id)
      .eq('medal_id', medal_id)
      .select()
      .single();
    if (pet_error || !updated_pet) throw new Error(`Failed to update pet'}`);

    // 4. Actualizar datos de la medalla si cambiaron
    const { error: update_medal_error } = await root
      .from('medals')
      .update({
        email: medal_email,
        full_name: medal_full_name,
        updated_at: new Date().toISOString()
      })
      .eq('id', medal_id);
    if (update_medal_error) throw new Error("Failed to update medal info");

    // 5. Invalidar el token usado (usa admin para bypassear RLS)
    const { error: revoke_error } = await root
      .from('pet_tokens')
      .update({ revoked_at: new Date().toISOString() })
      .eq('code', token_code)
      .eq('pet_id', id);
    if (revoke_error) throw new Error("Failed to revoke token");

    return { pet: updated_pet };
  }
});
