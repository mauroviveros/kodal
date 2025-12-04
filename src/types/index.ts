import { z } from "astro/zod";

export const PetSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  species: z.enum(['dog', 'cat', 'other']),
  breed: z.string().optional(),
  birthdate: z.preprocess(
    (val) => {
      console.log(val);
      console.log(new Date(val as string));
      return val && new Date(val as string)
    },
    z.date().optional()
  ),
  weight: z.preprocess(
    (val) => Number(val),
    z.number().min(0).optional()
  ),
  gender: z.enum(['male', 'female', 'unknown']).default('unknown'),
  message: z.string().optional(),



  owner_name: z.string(),
  owner_relationship: z.string().optional(),
  owner_phone: z.string(),
  owner_email: z.string().email(),
  owner_address: z.string().optional(),
});
export type Pet = z.infer<typeof PetSchema>;
