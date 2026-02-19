import { Constants } from "@types";
import { z } from "astro/zod";

export const insertPetSchema = z.object({
  id: z
    .string({
      required_error: "El ID es requerido",
      invalid_type_error: "El ID debe ser una cadena de texto",
      description: "ID de la mascota",
    })
    .uuid({
      message: "El ID debe ser un UUID válido",
    }),
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser una cadena de texto",
      description: "Nombre de la mascota",
    })
    .trim()
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  species: z.enum(
    Constants.public.Enums.PET_SPECIES,
    { message: 'Valor de especie no válido' }
  ),
  gender: z.enum(
    Constants.public.Enums.PET_GENDER,
    { message: 'Valor de género no válido' }
  ),
  breed: z
    .string({
      invalid_type_error: "La raza debe ser una cadena de texto",
      description: "Raza de la mascota",
    })
    .trim()
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .optional(),
  birth_date: z
    .string({
      invalid_type_error: "La fecha de nacimiento debe ser una cadena de texto",
      description: "Fecha de nacimiento de la mascota",
    })
    .optional(),
  avatar_file: z
    .instanceof(File, { message: "El avatar debe ser un archivo" })
    .optional(),
  medal_id: z
    .string({
      required_error: "El ID de la medalla es requerido",
      invalid_type_error: "El ID de la medalla debe ser una cadena de texto",
      description: "ID de la medalla asociada a la mascota",
    })
    .uuid({
      message: "El ID de la medalla debe ser un UUID válido",
    }),
  medal_full_name: z
    .string({
      required_error: "El nombre completo es requerido",
      invalid_type_error: "El nombre completo debe ser una cadena de texto",
      description: "Nombre completo del dueño de la medalla",
    })
    .trim()
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  medal_email:z
    .string({
      required_error: "El correo electrónico es requerido",
      invalid_type_error: "El correo electrónico debe ser una cadena de texto",
      description: "Correo electrónico del dueño de la medalla",
    })
    .email({
      message: "El correo electrónico debe ser válido",
    })
    .max(100, "El correo electrónico no puede exceder los 100 caracteres"),
  medal_phone: z
    .string({
      invalid_type_error: "El teléfono debe ser una cadena de texto",
      description: "Teléfono del dueño de la medalla",
    })
    .trim()
    .min(7, "El teléfono debe tener al menos 7 caracteres")
    .max(20, "El teléfono no puede exceder los 20 caracteres")
    .optional(),
  medal_relation_type: z
    .enum(
      Constants.public.Enums.MEDAL_RELATION,
      { message: "El tipo de relación no es válido" }
    ),
});

export const updatePetSchema = insertPetSchema.extend({
  token_code: z
    .string({
      required_error: "El código de token es requerido",
      invalid_type_error: "El código de token debe ser una cadena de texto",
      description: "Código de token para actualizar la mascota",
    })
    .uuid({
      message: "El código de token debe ser un UUID válido",
    }),
});

export const sendTokenEmailSchema = z.object({
  medal_id: z
    .string({
      required_error: "El ID de la medalla es requerido",
      invalid_type_error: "El ID de la medalla debe ser una cadena de texto",
      description: "ID de la medalla para enviar el email de token",
    })
    .uuid({
      message: "El ID de la medalla debe ser un UUID válido",
    }),
});
