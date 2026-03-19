import { Constants } from "@/interfaces";
import { z } from "zod";

const pet = z.object({
  name: z.string().trim().max(20).nonempty(),
  breed: z.string().trim().max(20).optional().nullable(),
  species: z.enum(Constants.public.Enums.PET_SPECIES).optional(),
  gender: z.enum(Constants.public.Enums.PET_GENDER).optional(),
  birth_date: z.string().optional().nullable(),
  notes: z.string().trim().max(500).optional().nullable(),
});

const owner = z.object({
  full_name: z.string().trim().max(50).nonempty(),
  email: z.email().max(100).nonempty(),
  phone: z.string().trim().max(20).optional().nullable(),
  address: z.string().trim().max(100).optional().nullable(),
  relation_type: z.enum(Constants.public.Enums.OWNER_RELATION).optional(),
});

export const MedalSchema = z.object({ pet, owner });
export type MedalInput = z.infer<typeof MedalSchema>;
