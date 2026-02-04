import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { createClient } from "@lib/supabase";
import { Constants } from "@lib/database";

export const generateToken = defineAction({
  input: z.object({
    pet_id: z.string().uuid(),
  }),
  handler: async ({ pet_id }, { request, cookies }) => {
    try {
      const supabase = createClient(request, cookies);

      const payload = {
        pet_id,
        code: crypto.randomUUID(),
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes from now
      };

      const { data, error } = await supabase.from('pet_tokens').insert(payload).select().single();
      if (error) throw error;

      return { token: data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
});
