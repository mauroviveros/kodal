import { createClient, createRoot } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { updatePetSchema } from "./schemas";

export default defineAction({
  accept: 'form',
  input: updatePetSchema,
  handler: async ({token_code, id, medal_id, ...payload}, { request, cookies, params }) => {
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
    const { data: pet, error: pet_error } = await supabase
      .from('pets')
      .update({
        updated_at: new Date().toISOString(),
        ...payload
      })
      .eq('id', id)
      .eq('medal_id', medal_id)
      .select()
      .single();

    console.log('Update result:', { pet, pet_error });

    if (pet_error || !pet) {
      console.error('Failed to update pet:', pet_error);
      throw new Error(`Failed to update pet: ${pet_error?.message || 'No data returned'}`);
    }

    // 4. Invalidar el token usado (usa admin para bypassear RLS)
    const { error: revoke_error } = await root
      .from('pet_tokens')
      .update({ revoked_at: new Date().toISOString() })
      .eq('code', token_code)
      .eq('pet_id', id);
    if (revoke_error) throw new Error("Failed to revoke token");

    return { pet };
  }
});
