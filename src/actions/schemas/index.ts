import { z } from "astro/zod";
import { Constants } from "@lib/database";

export const petFormSchema = z.object({
  medal_id: z.string().uuid(),
  name: z.string().min(1).max(50),
  species: z.enum(Constants.public.Enums.PET_SPECIES),
  gender: z.enum(Constants.public.Enums.PET_GENDER),
  breed: z.string().min(1).max(100).optional(),
  birth_date: z.string().optional(),
});

export const insertPetSchema = petFormSchema;
export const updatePetSchema = petFormSchema.extend({
  id: z.string().uuid(),
  token_code: z.string().uuid(),
});
