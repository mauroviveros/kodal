import { Field } from "@/components/Field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import type { MedalInput } from "@/schemas";
import { supabase } from "@/supabase/client";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";

export const AvatarForm = ({ avatar_path, updated_at }: { avatar_path?: string | null, updated_at: string | null }) => {
  const accept_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const { control } = useFormContext<MedalInput>();
  const { errors: { avatar_file: errors } } = useFormState({control, name: ['avatar_file']});
  const [src, setSrc] = useState<string | null>(null);

  const [avatar_url] = useState<string | null>(() => {
    if (!avatar_path) return null;
    const avatar_storage_url = supabase
      .storage
      .from('medals')
      .getPublicUrl(avatar_path)
      .data.publicUrl;

    if(!updated_at) return avatar_storage_url;
    return `${avatar_storage_url}?v=${updated_at}`
  });

  useEffect(() => {
    if(!src) setSrc(avatar_url);
  }, [src])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:image" className="size-5 text-primary" />
        <CardTitle>Foto de Perfil</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 items-center justify-items-center gap-x-4 md:grid-cols-[auto_1fr] md:justify-items-normal">
         <figure
           className={cn([
             "relative size-24 overflow-hidden rounded-full ring-primary/20 ring-4 shadow-xl mx-auto mb-5",
             src ? "bg-secondary/20" : "bg-muted/70 text-muted-foreground"
           ])}
         >
           {
             src ? (
               <img
                 src={src}
                  alt="Foto de perfil"
                 className="aspect-square size-full object-cover"
               />
             ) : (
               <Icon icon="lucide:image-off" className="size-12 m-6" />
             )
           }
         </figure>

         <Controller
           name="avatar_file"
           control={control}
           render={({ field: {onChange, value, ...field} }) => (
             <Field
                data-invalid={!!errors}
                htmlFor="pet_avatar_file"
                label="Foto de perfil"
                error={errors?.message}
               description="Formatos permitidos: JPG, JPEG, PNG o WEBP. Tamano maximo: 5MB."
              >
                <Input
                  type="file"
                  id="pet_avatar_file"
                  aria-invalid={!!errors}
                  {...field}
                  accept={accept_types.join(', ')}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file && accept_types.includes(file.type)) {
                      setSrc(file ? URL.createObjectURL(file) : null);
                    }
                    onChange(file);
                  }}
                />
             </Field>
           )}
         />
       </CardContent>
    </Card>
  )
}
