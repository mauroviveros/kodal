
// "use client"

// import { useTransition } from "react"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"

// import { createMedalProfileAction } from "@/app/actions"
// import { Button } from "@/components/ui/button"
// import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"

// type MedalFormProps = {
//   medalId: string;
// }

// type MedalFormValues = {
//   petName: string;
//   petSpecies: "DOG" | "CAT" | "OTHER";
//   petBreed: string;
//   ownerFullName: string;
//   ownerEmail: string;
//   ownerPhone: string;
//   ownerRelationType: "OWNER" | "FATHER" | "MOTHER" | "GUARDIAN" | "VETERINARIAN" | "EMERGENCY";
// }

// const selectClassName = "h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"

// export const MedalForm = ({ medalId }: MedalFormProps) => {
//   const router = useRouter()
//   const [isPending, startTransition] = useTransition()

//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm<MedalFormValues>({
//     defaultValues: {
//       petName: "",
//       petSpecies: "DOG",
//       petBreed: "",
//       ownerFullName: "",
//       ownerEmail: "",
//       ownerPhone: "",
//       ownerRelationType: "OWNER",
//     },
//   })

//   const onSubmit = (values: MedalFormValues) => {
//     startTransition(async () => {
//       const result = await createMedalProfileAction({
//         medalId,
//         petName: values.petName,
//         petSpecies: values.petSpecies,
//         petBreed: values.petBreed,
//         ownerFullName: values.ownerFullName,
//         ownerEmail: values.ownerEmail,
//         ownerPhone: values.ownerPhone,
//         ownerRelationType: values.ownerRelationType,
//       })

//       if (!result.success) {
//         const fieldErrors = result.fieldErrors
//         if (fieldErrors?.petName) setError("petName", { type: "server", message: fieldErrors.petName })
//         if (fieldErrors?.petSpecies) setError("petSpecies", { type: "server", message: fieldErrors.petSpecies })
//         if (fieldErrors?.petBreed) setError("petBreed", { type: "server", message: fieldErrors.petBreed })
//         if (fieldErrors?.ownerFullName) setError("ownerFullName", { type: "server", message: fieldErrors.ownerFullName })
//         if (fieldErrors?.ownerEmail) setError("ownerEmail", { type: "server", message: fieldErrors.ownerEmail })
//         if (fieldErrors?.ownerPhone) setError("ownerPhone", { type: "server", message: fieldErrors.ownerPhone })
//         if (fieldErrors?.ownerRelationType) setError("ownerRelationType", { type: "server", message: fieldErrors.ownerRelationType })
//         if (result.formError) setError("root", { type: "server", message: result.formError })
//         return
//       }

//       router.push(`/medal/${medalId}`)
//       router.refresh()
//     })
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <section className="space-y-4">
//         <h2 className="text-lg font-semibold">Mascota</h2>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="petName">Nombre</FieldLabel>
//           <Input
//             id="petName"
//             placeholder="Ej: Luna"
//             {...register("petName", {
//               required: "El nombre es obligatorio",
//               minLength: { value: 2, message: "Mínimo 2 caracteres" },
//             })}
//           />
//           <FieldError>{errors.petName?.message}</FieldError>
//         </Field>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="petSpecies">Especie</FieldLabel>
//           <select id="petSpecies" className={selectClassName} {...register("petSpecies")}>
//             <option value="DOG">Perro</option>
//             <option value="CAT">Gato</option>
//             <option value="OTHER">Otra</option>
//           </select>
//           <FieldError>{errors.petSpecies?.message}</FieldError>
//         </Field>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="petBreed">Raza (opcional)</FieldLabel>
//           <Input id="petBreed" placeholder="Ej: Mestizo" {...register("petBreed")} />
//           <FieldError>{errors.petBreed?.message}</FieldError>
//         </Field>
//       </section>

//       <section className="space-y-4">
//         <h2 className="text-lg font-semibold">Responsable</h2>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="ownerFullName">Nombre completo</FieldLabel>
//           <Input
//             id="ownerFullName"
//             placeholder="Ej: Mauro Viveros"
//             {...register("ownerFullName", {
//               required: "El nombre del responsable es obligatorio",
//               minLength: { value: 2, message: "Mínimo 2 caracteres" },
//             })}
//           />
//           <FieldError>{errors.ownerFullName?.message}</FieldError>
//         </Field>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="ownerEmail">Email</FieldLabel>
//           <Input
//             id="ownerEmail"
//             type="email"
//             placeholder="tu@email.com"
//             {...register("ownerEmail", {
//               required: "El email es obligatorio",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Email inválido",
//               },
//             })}
//           />
//           <FieldError>{errors.ownerEmail?.message}</FieldError>
//         </Field>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="ownerPhone">Teléfono (opcional)</FieldLabel>
//           <Input id="ownerPhone" type="tel" placeholder="Ej: +54 11 5555 5555" {...register("ownerPhone")} />
//           <FieldError>{errors.ownerPhone?.message}</FieldError>
//         </Field>

//         <Field className="gap-1">
//           <FieldLabel htmlFor="ownerRelationType">Relación con la mascota</FieldLabel>
//           <select id="ownerRelationType" className={selectClassName} {...register("ownerRelationType")}>
//             <option value="OWNER">Dueño/a</option>
//             <option value="FATHER">Padre</option>
//             <option value="MOTHER">Madre</option>
//             <option value="GUARDIAN">Tutor/a</option>
//             <option value="VETERINARIAN">Veterinario/a</option>
//             <option value="EMERGENCY">Contacto de emergencia</option>
//           </select>
//           <FieldDescription>
//             Este dato nos ayuda a identificar correctamente al contacto principal.
//           </FieldDescription>
//           <FieldError>{errors.ownerRelationType?.message}</FieldError>
//         </Field>
//       </section>

//       <FieldError>{errors.root?.message}</FieldError>

//       <Button type="submit" disabled={isSubmitting || isPending}>
//         Guardar perfil
//       </Button>
//     </form>
//   )
// }
