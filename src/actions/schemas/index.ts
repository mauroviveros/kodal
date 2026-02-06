import { z } from "astro/zod";
import { Constants } from "@lib/database";

export const petSchema = z.object({
  medal_id: z.string().uuid(),
  medal_full_name: z.string().min(1).max(50),
  medal_email: z.string().email(),
  name: z.string().min(1).max(50),
  species: z.enum(Constants.public.Enums.PET_SPECIES),
  gender: z.enum(Constants.public.Enums.PET_GENDER),
  breed: z.string().min(1).max(50).optional(),
  birth_date: z.string().optional(),

});
export const insertPetSchema = petSchema;

export const updatePetSchema = petSchema.extend({
  id: z.string().uuid(),
  token_code: z.string().uuid(),
})

