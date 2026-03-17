import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Field } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Icon } from "@iconify/react";
import { FormField } from "../FormField";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { OWNER_RELATION_LABELS } from "@/constants";
import type { MedalFormEditProps } from "@/schemas";

export const OwnerForm = ({ control, errors }: MedalFormEditProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:contact" className="size-5 text-primary" />
        <CardTitle>Información del Dueño</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <Field data-invalid={!!errors.owner?.relation_type}>
          <FormField
            htmlFor="owner.relation_type"
            label="Relación con la mascota"
            error={errors.owner?.relation_type?.message}
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
                    aria-invalid={!!errors.owner?.relation_type}
                  >
                    <SelectValue placeholder="Selecciona una relación" aria-invalid />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Relaciones</SelectLabel>
                      {Object.entries(OWNER_RELATION_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner?.full_name}>
          <FormField
            htmlFor="owner.full_name"
            label="Nombre completo"
            error={errors.owner?.full_name?.message}
            description="Nombre de la persona a contactar en caso de pérdida."
            required
          >
            <Input
              id="owner.full_name"
              placeholder="Ej: Julieta Carabajal"
              aria-invalid={!!errors.owner?.full_name}
              {...control.register('owner.full_name')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner?.email}>
          <FormField
            htmlFor="owner.email"
            label="Correo electrónico"
            error={errors.owner?.email?.message}
            description="Correo de contacto para recibir notificaciones."
            required
          >
            <Input
              type="email"
              id="owner.email"
              placeholder="Ej: tu@email.com"
              aria-invalid={!!errors.owner?.email}
              {...control.register('owner.email')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner?.phone}>
          <FormField
            htmlFor="owner.phone"
            label="Teléfono de contacto"
            error={errors.owner?.phone?.message}
            description="Incluye el código de área para asegurar que podamos contactarte por Whatsapp."
          >
            <Input
              type="tel"
              id="owner.phone"
              placeholder="Ej: Julieta Carabajal"
              aria-invalid={!!errors.owner?.phone}
              {...control.register('owner.phone')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner?.address}>
          <FormField
            htmlFor="owner.address"
            label="Dirección"
            error={errors.owner?.address?.message}
            description="Opcional. Ayuda a identificar la ubicación de la mascota en caso de pérdida."
          >
            <Input
              type="text"
              id="owner.address"
              placeholder="Ej: Av. Siempre Viva 123"
              aria-invalid={!!errors.owner?.address}
              {...control.register('owner.address')}
              disabled
            />
          </FormField>
        </Field>
      </CardContent>
    </Card>
  );
}
