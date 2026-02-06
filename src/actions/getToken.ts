import { createClient } from "@lib/supabase";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";

export default defineAction({
  input: z.object({
    pet_id: z.string().uuid(),
    token_code: z.string().uuid(),
  }),
  handler: async ({ token_code, pet_id }, { request, cookies }) => {
    const supabase = createClient(request, cookies);

    // 1. Verificar el token
    const { data, error } = await supabase
      .from('pet_tokens')
      .select('*')
      .eq('code', token_code)
      .eq('pet_id', pet_id)
      .is('revoked_at', null)
      .gt('expires_at', new Date().toISOString())
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return { token: data };
  }
});
