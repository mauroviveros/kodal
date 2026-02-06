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
    if (query_error) throw query_error;

    if (data) {
      const { pets, ...medal } = data;
      return { medal, pet: pets};
    }

    return { medal: null, pet: null };
  },
});
