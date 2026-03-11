import z from "zod";
import { Constants } from "./database";

const PetSchema = z.object({
  name: z.string().trim().max(50),
  species: z.enum(Constants.public.Enums.PET_SPECIES),
  gender: z.enum(Constants.public.Enums.PET_GENDER),
  breed: z.string().trim().max(50).optional(),
  birth_date: z.string().optional(),
  // notes: z.string().trim().max(500).optional(),
})

const OwnerSchema = z.object({
  full_name: z.string().trim().max(50),
  email: z.email().trim().max(100),
  phone: z.string().trim().max(20).optional(),
  relation_type: z.enum(Constants.public.Enums.CONTACT_RELATION),
  // address: string | null
})


export const InsertMedalSchema = z.object({
  pet: PetSchema,
  owner: OwnerSchema
});

export type InsertMedalInput = z.infer<typeof InsertMedalSchema>;
export type InsertMedalResult = {
  success: boolean;
}
