import { z } from 'astro/zod';
import { root } from '@supabase';
import { defineAction } from 'astro:actions';
import { getMedalPetById, getToken } from '@repositories';

export default defineAction({
  input: z.object({
    medal_id: z.string().uuid(),
    withToken: z.boolean().default(false),
  }),
  handler: async ({ medal_id, withToken }, { locals: { supabase } }) => {
    const medal = await getMedalPetById(supabase, { id: medal_id });
    if (!withToken || !medal?.pets) return { medal, token: null };

    const token = await getToken(root, { pet_id: medal.pets.id });
    return { medal, token };
  },
});
