import { z } from "astro/zod";
import { root } from "@supabase";
import { defineAction } from "astro:actions";
import { getMedalById, getPetByMedalId, getToken } from "@repositories";

export default defineAction({
  input: z.object({
    medal_id: z.string().uuid(),
  }),
  handler: async ({ medal_id }, { locals: { supabase } }) => {
    // 1. Obtener datos de medalla
    const medal = await getMedalById(supabase, { id: medal_id });
    if (!medal) return { medal: null, pet: null, token: null };

    // 2. Obtener datos de mascota asociada a la medalla
    const pet = await getPetByMedalId(supabase, { medal_id: medal.id });
    if (!pet) return { medal, pet: null, token: null };

    // 3. Obtener token activo asociado a la mascota (si existe)
    const token = await getToken(root, { pet_id: pet.id });

    return { medal, pet, token };
  },
});
