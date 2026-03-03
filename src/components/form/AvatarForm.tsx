
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "./FormField";
import type { FormSchema } from "@schemas";

interface Props {
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
  avatar_url?: string;
}
export function AvatarForm({ control, errors, avatar_url }: Props) {
  const [src, setSrc] = useState<string | undefined>(avatar_url);

  return (
    <section className="card">
      <h2 className="text-balance px-6 font-semibold text-foreground">
        <Icon icon="lucide:image" className="mr-2 inline-block text-primary" />
        Foto de Perfil
      </h2>

      <div className="p-6 grid grid-cols-1 items-center justify-items-center gap-x-4 md:grid-cols-[auto_1fr] md:justify-items-normal">

        <figure className="relative size-32 overflow-hidden rounded-full ring-primary/20 bg-primary/20 ring-4">
          {src && (
            <img
              src={src}
              alt="Avatar de la mascota"
              className="aspect-square size-full object-cover"
            />
          )}
        </figure>

        <Controller
          name="avatar_file"
          control={control}
          render={({ field: {onChange, value, ...field} }) => (
            <Input
              type="file"
              accept="image/jpeg,image/png, image/webp"
              helper="Solo se permiten archivos JPG, JPEG o PNG. Máximo 5MB."
              label="Foto de perfil"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setSrc(file ? URL.createObjectURL(file) : undefined);
                onChange(file);
              }}
              error={errors.avatar_file}
              { ...field }
            />
          )}
        />
      </div>
    </section>
  );
}
