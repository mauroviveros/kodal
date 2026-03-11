


// const createMedalProfileSchema = z.object({
//   medalId: z.string().uuid("Medalla inválida"),
//   petName: z.string().trim().min(2, "El nombre de la mascota es obligatorio"),
//   petSpecies: z.enum(["DOG", "CAT", "OTHER"]),
//   petBreed: z.string().trim().optional().or(z.literal("")),
//   ownerFullName: z.string().trim().min(2, "El nombre del responsable es obligatorio"),
//   ownerEmail: z.email("Email inválido"),
//   ownerPhone: z.string().trim().optional().or(z.literal("")),
//   ownerRelationType: z.enum(["OWNER", "FATHER", "MOTHER", "GUARDIAN", "VETERINARIAN", "EMERGENCY"]),
// })

// type CreateMedalProfileInput = z.infer<typeof createMedalProfileSchema>

// export type CreateMedalProfileResult = {
//   success: boolean;
//   formError?: string;
//   fieldErrors?: Partial<Record<keyof CreateMedalProfileInput, string>>;
// }

// export const createMedalProfileAction = async (
//   input: CreateMedalProfileInput
// ): Promise<CreateMedalProfileResult> => {
//   const parsed = createMedalProfileSchema.safeParse(input)

//   if (!parsed.success) {
//     const fieldErrors = parsed.error.flatten().fieldErrors
//     return {
//       success: false,
//       fieldErrors: {
//         medalId: fieldErrors.medalId?.[0],
//         petName: fieldErrors.petName?.[0],
//         petSpecies: fieldErrors.petSpecies?.[0],
//         petBreed: fieldErrors.petBreed?.[0],
//         ownerFullName: fieldErrors.ownerFullName?.[0],
//         ownerEmail: fieldErrors.ownerEmail?.[0],
//         ownerPhone: fieldErrors.ownerPhone?.[0],
//         ownerRelationType: fieldErrors.ownerRelationType?.[0],
//       },
//     }
//   }

//   const data = parsed.data

//   const { data: medal, error: medalError } = await supabase
//     .from("medals")
//     .select("id")
//     .eq("id", data.medalId)
//     .maybeSingle()

//   if (medalError || !medal) {
//     return { success: false, formError: "No encontramos la medalla para completar el registro" }
//   }

//   const { error: petError } = await supabase
//     .from("medal_pets")
//     .upsert({
//       medal_id: data.medalId,
//       name: data.petName,
//       species: data.petSpecies,
//       breed: data.petBreed || null,
//     }, { onConflict: "medal_id" })

//   if (petError) {
//     return { success: false, formError: "No pudimos guardar los datos de la mascota" }
//   }

//   const { error: ownerError } = await supabase
//     .from("medal_owners")
//     .upsert({
//       medal_id: data.medalId,
//       full_name: data.ownerFullName,
//       email: data.ownerEmail,
//       phone: data.ownerPhone || null,
//       relation_type: data.ownerRelationType,
//     }, { onConflict: "medal_id" })

//   if (ownerError) {
//     return { success: false, formError: "No pudimos guardar los datos del responsable" }
//   }

//   return { success: true }
// }
