import { z } from "astro/zod";
import { Constants } from "@lib/database";

const medalSchema = z.object({
  medal_id: z.string().uuid(),
  medal_full_name: z.string().min(1).max(50),
  medal_email: z.string().email().max(100),
  medal_phone: z.string().min(7).max(20).optional(),
  medal_relation_type: z.enum(Constants.public.Enums.MEDAL_RELATION),
});

const petSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  species: z.enum(Constants.public.Enums.PET_SPECIES),
  gender: z.enum(Constants.public.Enums.PET_GENDER),
  breed: z.string().min(1).max(50).optional(),
  birth_date: z.string().optional(),
  avatar_file: z.instanceof(File).optional(),

});
export const insertPetSchema = z.object({}).merge(medalSchema).merge(petSchema);

export const updatePetSchema = z.object({}).merge(medalSchema).merge(petSchema).extend({
  token_code: z.string().uuid(),
})

