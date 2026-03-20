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
const avatar_file = z
  .instanceof(File, { message: "El archivo debe ser una imagen válida." })
  .refine(file => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    return allowedTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // 5MB
  }, { message: "Solo se permiten archivos JPG, JPEG o PNG. Máximo 5MB." })
  .optional();

export const MedalSchema = z.object({ medal_id, pet, owner, avatar_file });
export type MedalInput = z.infer<typeof MedalSchema>;

export const MedalEditSchema = MedalSchema.extend({ token_code });
export type MedalEditInput = z.infer<typeof MedalEditSchema>;
