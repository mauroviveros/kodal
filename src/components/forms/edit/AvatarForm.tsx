// import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
// import { Input } from "@/components/shadcn/input"
// import type { MedalFormProps, Tables } from "@/interfaces"
// import { cn } from "@/utils"
// import { Icon } from "@iconify/react"
// import { useEffect, useState } from "react"
// import { Controller } from "react-hook-form"
// import { FormField } from "../FormField"
// import { Field } from "@/components/shadcn/field"
// import { supabase } from "@/supabase"

// type Props = MedalFormProps & Pick<Tables<'pets'>, 'avatar_path'>;
// export const AvatarForm = ({ control, errors, avatar_path }: Props) => {
//   const [src, setSrc] = useState<string | null>(null);
//   const [avatar_url] = useState<string | null>(() => {
//     if (!avatar_path) return null;
//     return supabase
//       .storage
//       .from('pet_avatars')
//       .getPublicUrl(avatar_path)
//       .data.publicUrl;
//   });

//   useEffect(() => {
//     if(!src) setSrc(avatar_url);
//   }, [src])

//   return (
//     <Card>
//       <CardHeader className="flex items-center gap-2">
//         <Icon icon="lucide:image" className="size-5 text-primary" />
//         <CardTitle>Foto de Perfil</CardTitle>
//       </CardHeader>

//       <CardContent className="grid grid-cols-1 items-center justify-items-center gap-x-4 md:grid-cols-[auto_1fr] md:justify-items-normal">
//         <figure
//           className={cn([
//             "relative size-24 overflow-hidden rounded-full ring-primary/20 ring-4 shadow-xl mx-auto mb-5",
//             src ? "bg-secondary/20" : "bg-muted/70 text-muted-foreground"
//           ])}
//         >
//           {
//             src ? (
//               <img
//                 src={src}
//                 alt={`Foto de ${name}`}
//                 className="aspect-square size-full object-cover"
//               />
//             ) : (
//               <Icon icon="lucide:image-off" className="size-12 m-6" />
//             )
//           }
//         </figure>

//         <Controller
//           name="pet_avatar_file"
//           control={control}
//           render={({ field: {onChange, value, ...field} }) => (
//             <Field data-invalid={!!errors.pet_avatar_file}>
//               <FormField
//                 htmlFor="pet_avatar_file"
//                 label="Foto de perfil"
//                 error={errors.pet_avatar_file?.message}
//                 description="Solo se permiten archivos JPG, JPEG o PNG. Máximo 5MB."
//               >
//                 <Input
//                   type="file"
//                   id="pet_avatar_file"
//                   aria-invalid={!!errors.pet_avatar_file}
//                   {...field}
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     setSrc(file ? URL.createObjectURL(file) : null);
//                     onChange(file);
//                   }}
//                 />
//               </FormField>
//             </Field>
//           )}
//         />
//       </CardContent>
//     </Card>
//   )
// }
