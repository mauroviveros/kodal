import { Constants } from "@/interfaces";
import { z } from "zod";

const medal = z.object({
  id: z.uuid(),
})

const pet = z.object({
  pet_name: z.string().trim().max(20).nonempty(),
  pet_breed: z.string().trim().max(20).optional(),
  pet_species: z.enum(Constants.public.Enums.PET_SPECIES).optional(),
  pet_gender: z.enum(Constants.public.Enums.PET_GENDER).optional(),
  pet_birth_date: z.string().optional(),
  pet_notes: z.string().trim().max(500).optional(),
});

const owner = z.object({
  owner_full_name: z.string().trim().max(50).nonempty(),
  owner_email: z.email().max(100).nonempty(),
  owner_phone: z.string().trim().max(20).optional(),
  owner_address: z.string().trim().max(100).optional(),
  owner_relation_type: z.enum(Constants.public.Enums.OWNER_RELATION).optional(),
})

export const MedalFormSchema = z
  .object({})
  .extend(medal.shape)
  .extend(pet.shape)
  .extend(owner.shape);

export type MedalFormInput = z.infer<typeof MedalFormSchema>;
