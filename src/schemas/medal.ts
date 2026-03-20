import { Constants } from "@/interfaces";
import { z } from "zod";

const pet = z.object({
  name: z
    .string()
    .trim()
    .max(20, { message: "El nombre no puede superar los 20 caracteres." })
    .nonempty({ message: "El nombre es obligatorio." }),
  breed: z
    .string()
    .trim()
    .max(20, { message: "La raza no puede superar los 20 caracteres." })
    .optional()
    .nullable(),
  species: z
    .enum(Constants.public.Enums.PET_SPECIES)
    .optional(),
  gender: z
    .enum(Constants.public.Enums.PET_GENDER)
    .optional(),
  birth_date: z
    .string()
    .optional()
    .nullable(),
  notes: z
    .string()
    .trim()
    .max(500, { message: "Las notas no pueden superar los 500 caracteres." })
    .optional()
    .nullable(),
});

const owner = z.object({
  full_name: z.
    string()
    .trim()
    .max(50, { message: "El nombre completo no puede superar los 50 caracteres." })
    .nonempty({ message: "El nombre completo es obligatorio." }),
  email: z
    .email({ message: "Ingresa un correo electronico valido." })
    .max(100, { message: "El correo electronico no puede superar los 100 caracteres." })
    .nonempty({ message: "El correo electronico es obligatorio." }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "El telefono no puede superar los 20 caracteres." })
    .optional()
    .nullable(),
  address: z
    .string()
    .max(100, { message: "La direccion no puede superar los 100 caracteres." })
    .optional()
    .nullable(),
  relation_type: z
    .enum(Constants.public.Enums.OWNER_RELATION)
    .optional(),
});

const medal_id = z.uuid({ message: "El ID de la medalla no es valido." });
const token_code = z.string().nonempty({ message: "El codigo de verificacion es obligatorio." });
const avatar_file = z
  .instanceof(File, { message: "Debes seleccionar un archivo de imagen valido." })
  .refine((file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    return allowedTypes.includes(file.type);
  }, { message: "Formato no permitido. Usa JPG, JPEG, PNG o WEBP." })
  .refine((file) => file.size <= 5 * 1024 * 1024, { message: "La imagen supera el tamano maximo de 5MB." })
  .optional();

export const MedalSchema = z.object({ medal_id, pet, owner, avatar_file });
export type MedalInput = z.infer<typeof MedalSchema>;

export const MedalEditSchema = MedalSchema.extend({ token_code });
export type MedalEditInput = z.infer<typeof MedalEditSchema>;
