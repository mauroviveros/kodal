
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Input, Select } from "./FormField";
import { MEDAL_RELATIONS } from "@constants";
import type { FormSchema } from "@schemas";

interface Props {
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
}
export const OwnerForm = ({ control, errors }: Props) => (
  <section className="card">
    <h2 className="text-balance px-6 font-semibold text-foreground">
      <Icon icon="lucide:phone" className="mr-2 inline-block text-primary" />
      Información de contacto
    </h2>

    <div className="p-6 grid space-y-2">
      <input type="hidden" {...control.register('owner.id')} />

      <Controller
        name="owner.relation_type"
        control={control}
        render={({ field }) => (
          <Select
            label="Relación con la mascota"
            helper="Indica la relación con la mascota."
            items={Object.entries(MEDAL_RELATIONS).map(([value, label]) => ({ value, label }))}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="owner.full_name"
        control={control}
        render={({ field }) => (
          <Input
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            helper="Nombre de la persona a contactar"
            error={errors.owner?.full_name}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="owner.email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            label="Correo electrónico"
            placeholder="Ej: tu@email.com"
            helper="Correo de contacto para recibir notificaciones."
            error={errors.owner?.email}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="owner.phone"
        control={control}
        render={({ field }) => (
          <Input
            type="tel"
            label="Teléfono de contacto"
            placeholder="Ej: +54 9 11 1234-5678"
            helper="Incluye el código de área para asegurar que podamos contactarte por Whatsapp."
            error={errors.owner?.phone}
            {...field}
          />
        )}
      />

      <Controller
        name="owner.address"
        control={control}
        render={({ field }) => (
          <Input
            label="Dirección"
            placeholder="Ej: Av. Siempre Viva 123"
            helper="Correo de contacto en caso de encontrar a la mascota y para recibir notificaciones."
            error={errors.owner?.address}
            disabled
            {...field}
          />
        )}
      />
    </div>
  </section>
);
