import z from "zod";
import { Constants } from "./database";

const PetSchema = z.object({
  name: z.string().trim().max(50),
  species: z.enum(Constants.public.Enums.PET_SPECIES).default("OTHER"),
  gender: z.enum(Constants.public.Enums.PET_GENDER).default("UNKNOWN"),
  breed: z.string().trim().max(50).optional(),
  birth_date: z.string().optional(),
  notes: z.string().trim().max(500).optional(),
})


export const InsertMedalSchema = z.object({
  pet: PetSchema,
});

export type InsertMedalInput = z.infer<typeof InsertMedalSchema>;
export type InsertMedalResult = {
  success: boolean;
}
