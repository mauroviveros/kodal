import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { insertNewMedals } from '@repositories';

export default defineAction({
  accept: 'json',
  input: z.object({
    quantity: z.number().int().min(1).max(100),
  }),
  handler: async ({ quantity }, { locals: { supabase } }) => {
    const data = await insertNewMedals(supabase, { quantity });
    return { medals: data };
  },
});
