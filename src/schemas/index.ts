import { Constants } from "@types";
import { z } from "astro/zod";

const petSchema = z.object({
  id: z.number({ coerce: true }).optional(),
  name: z.string().trim().max(50),
  species: z.enum(Constants.public.Enums.PET_SPECIES),
  gender: z.enum(Constants.public.Enums.PET_GENDER),
  breed: z.string({ coerce: true }).trim().max(50).optional(),
  birth_date: z.string({ coerce: true }).optional(),
  notes: z.string({ coerce: true }).trim().max(500).optional(),
});

const ownerSchema = z.object({
  id: z.number({ coerce: true }).optional(),
  relation_type: z.enum(Constants.public.Enums.CONTACT_RELATION),
  full_name: z.string().trim().max(100),
  email: z.string().email().max(100),
  phone: z.string({ coerce: true }).trim().max(20).optional(),
  address: z.string({ coerce: true }).trim().max(200).optional(),
});


export const formSchema = z.object({
  medal_id: z.string().uuid(),
  token_code: z.string({ coerce: true }).optional(),

  pet: petSchema,
  owner: ownerSchema,

  avatar_file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "El archivo no debe exceder los 5MB")
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "El archivo debe ser JPEG, PNG o WebP")
    .optional(),
});


export type FormSchema = z.infer<typeof formSchema>;
