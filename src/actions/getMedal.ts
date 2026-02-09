import type { Database } from "@lib/database";
import { createClient } from "@lib/supabase";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";

export default defineAction({
  input: z.object({
    medal_id: z.string().uuid(),
  }),
  handler: async ({ medal_id }, { request, cookies }) => {
    const supabase = createClient(request, cookies);

    // 1. Buscar la medalla con su mascota asociada
    const { data, error: query_error } = await supabase
      .from('medals')
      .select('*, pets(*)')
      .eq('id', medal_id)
      .limit(1, { foreignTable: 'pets' })
      .maybeSingle();
    // if (query_error || !data) throw new Error("Medal not found");
    if (query_error || !data) return { medal: null, pet: null, token: null };

    // 2. Separar la medalla de la mascota (si existe)
    const { pets, ...medal } = data;
    if(!pets) return { medal: data, pet: null, token: null };
    const pet = (Array.isArray(pets) ? pets[0] : pets) as Database["public"]["Tables"]["pets"]["Row"];

    // 2. Obtener el token activo de la mascota (si existe)
    let token = null;
    if (!import.meta.env.DISABLE_TOKEN) {
      const { data: tokenData, error: token_error } = await supabase
        .from('pet_tokens')
        .select('*')
        .eq('pet_id', pet.id)
        .is('revoked_at', null)
        .gt('expires_at', new Date().toISOString())
        .limit(1)
        .maybeSingle();
      if (token_error) throw token_error;
      token = tokenData;
    }

    return { medal, pet, token };


  },
});
