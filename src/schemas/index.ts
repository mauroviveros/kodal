import { Constants } from "@lib/database";
import { z } from "astro/zod";

const validDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export const schema = z.object({
  name: z.string().min(1).max(25),
  message: z.string().min(0).max(250).optional(),
  weight: z.number().min(0).max(999).optional(),
  birthdate: z.string().refine(validDate, { message: "Invalid date" }).optional(),
  breed: z.string().min(1).max(25).optional(),
  gender: z.enum(Constants.public.Enums.pet_gender).optional(),
  kind: z.enum(Constants.public.Enums.pet_kind).optional()
});
