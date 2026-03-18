import { Constants, type FormProps } from "@/interfaces";
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

const medal_id = z.uuid();
const token_code = z.string().nonempty();

export const MedalFormEditSchema = z.object({ medal_id, pet, owner, token_code });
export type MedalFormEditInput = z.infer<typeof MedalFormEditSchema>;
export type MedalFormEditProps = FormProps<MedalFormEditInput>;

export const MedalFormCreateSchema = z.object({ medal_id, pet, owner });
export type MedalFormCreateInput = z.infer<typeof MedalFormCreateSchema>;
export type MedalFormCreateProps = FormProps<MedalFormCreateInput>;
