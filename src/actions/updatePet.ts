import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { supabase } from "@/supabase";

export const updatePet = defineAction({
  accept: "form",
  input: z.object({
    medal_id: z.string(),
    pet: z.any(),
    owner: z.any(),
  }),
  handler: async ({ medal_id, pet, owner }) => {
    console.log("Received data:", { medal_id, pet, owner });
    return medal_id;
  }
});
