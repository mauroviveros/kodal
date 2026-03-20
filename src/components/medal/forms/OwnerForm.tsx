import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Icon } from "@iconify/react"
import { Controller, useFormContext, useFormState } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { OWNER_RELATION_LABELS } from "@/constants"
import { Input } from "@/components/shadcn/input"
import type { MedalInput } from "../types";
import { Field } from "@/components/Field";

export const OwnerForm = () => {
  const { register, control } = useFormContext<MedalInput>();
  const { errors: { owner: errors } } = useFormState({control, name: ['owner.address', 'owner.email', 'owner.full_name', 'owner.phone', 'owner.relation_type']});
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:contact" className="size-5 text-primary" />
        <CardTitle>Información del Dueño</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <Field
          data-invalid={!!errors?.relation_type}
          htmlFor="owner.relation_type"
          label="Relación con la mascota"
          error={errors?.relation_type?.message}
          description="Indica tu relación con la mascota."
          required
        >
          <Controller
            name="owner.relation_type"
            control={control}
            render={({ field: { onChange, value, ...field }}) => (
              <Select
                onValueChange={onChange}
                defaultValue={value}
                {...field}
              >
                <SelectTrigger
                  aria-invalid={!!errors?.relation_type}
                >
                  <SelectValue placeholder="Selecciona una relación" aria-invalid />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Relaciones</SelectLabel>
                    {Object.entries(OWNER_RELATION_LABELS).map(([key, {label, icon}]) => (
                      <SelectItem key={key} value={key}>
                        <Icon icon={icon} />
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          data-invalid={!!errors?.full_name}
          htmlFor="owner.full_name"
          label="Nombre completo"
          error={errors?.full_name?.message}
          description="Nombre de la persona a contactar en caso de pérdida."
          required
        >
          <Input
            id="owner.full_name"
            placeholder="Ej: Julieta Carabajal"
            aria-invalid={!!errors?.full_name}
            {...register('owner.full_name', { value: '' })}
          />
        </Field>

        <Field
          data-invalid={!!errors?.email}
          htmlFor="owner.email"
          label="Correo electrónico"
          error={errors?.email?.message}
          description="Correo de contacto para recibir notificaciones."
          required
        >
          <Input
            type="email"
            id="owner.email"
            placeholder="Ej: tu@email.com"
            aria-invalid={!!errors?.email}
            {...register('owner.email', { value: '' })}
          />
        </Field>

        <Field
          data-invalid={!!errors?.phone}
          htmlFor="owner.phone"
          label="Teléfono de contacto"
          error={errors?.phone?.message}
          description="Incluye el código de área para asegurar que podamos contactarte por Whatsapp."
        >
          <Input
            type="tel"
            id="owner.phone"
            placeholder="Ej: +54 9 11 1234-5678"
            aria-invalid={!!errors?.phone}
            {...register('owner.phone', { value: '' })}
          />
        </Field>

        <Field
          data-invalid={!!errors?.address}
          htmlFor="owner.address"
          label="Dirección"
          error={errors?.address?.message}
          description="Opcional. Ayuda a identificar la ubicación de la mascota en caso de pérdida."
        >
          <Input
            type="text"
            id="owner.address"
            placeholder="Ej: Av. Siempre Viva 123"
            aria-invalid={!!errors?.address}
            {...register('owner.address', { value: '' })}
          />
        </Field>
      </CardContent>
    </Card>
  )
}
