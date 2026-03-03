import { Constants } from "@types";
import { z } from "astro/zod";

export const medalSchema = z.object({
  pet: z.object({
    name: z
      .string({
        description: "Nombre de la mascota",
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser una cadena de texto",
      })
      .trim()
      .min(1, "El nombre debe tener al menos 1 carácter")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    species: z
      .enum(Constants.public.Enums.PET_SPECIES, {
        description: "Especie de la mascota",
        message: "Valor de especie no válido",
      })
      .default(Constants.public.Enums.PET_SPECIES[2]),
    gender: z
      .enum(Constants.public.Enums.PET_GENDER, {
        description: "Género de la mascota",
        message: "Valor de género no válido",
      })
      .default(Constants.public.Enums.PET_GENDER[2]),
    breed: z
      .string({
        invalid_type_error: "La raza debe ser una cadena de texto",
        description: "Raza de la mascota",
      })
      .trim()
      .min(1, "La raza debe tener al menos 1 carácter")
      .max(50, "La raza no puede exceder los 50 caracteres")
      .optional(),
    birth_date: z
      .string({
        invalid_type_error: "La fecha de nacimiento debe ser una cadena de texto",
        description: "Fecha de nacimiento de la mascota",
      })
      .refine(date => !isNaN(Date.parse(date)), { message: "Formato de fecha no válido" })
      .optional(),
  }),
});
