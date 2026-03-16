import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Field } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Icon } from "@iconify/react";
import type { MedalFormProps } from "@/interfaces";
import { FormField } from "../FormField";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { OWNER_RELATION_LABELS } from "@/constants";

export const OwnerForm = ({ control, errors }: MedalFormProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:contact" className="size-5 text-primary" />
        <CardTitle>Información del Dueño</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <Field data-invalid={!!errors.owner_relation_type}>
          <FormField
            htmlFor="owner_relation_type"
            label="Relación con la mascota"
            error={errors.owner_relation_type?.message}
            description="Indica tu relación con la mascota."
            required
          >
            <Controller
              name="owner_relation_type"
              control={control}
              render={({ field: { onChange, value, ...field }}) => (
                <Select
                  onValueChange={onChange}
                  defaultValue={value}
                  {...field}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.owner_relation_type}
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

        <Field data-invalid={!!errors.owner_full_name}>
          <FormField
            htmlFor="owner_full_name"
            label="Nombre completo"
            error={errors.owner_full_name?.message}
            description="Nombre de la persona a contactar en caso de pérdida."
            required
          >
            <Input
              id="owner_full_name"
              placeholder="Ej: Julieta Carabajal"
              aria-invalid={!!errors.owner_full_name}
              {...control.register('owner_full_name')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner_email}>
          <FormField
            htmlFor="owner_email"
            label="Correo electrónico"
            error={errors.owner_email?.message}
            description="Correo de contacto para recibir notificaciones."
            required
          >
            <Input
              type="email"
              id="owner_email"
              placeholder="Ej: tu@email.com"
              aria-invalid={!!errors.owner_email}
              {...control.register('owner_email')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner_phone}>
          <FormField
            htmlFor="owner_phone"
            label="Teléfono de contacto"
            error={errors.owner_phone?.message}
            description="Incluye el código de área para asegurar que podamos contactarte por Whatsapp."
          >
            <Input
              type="tel"
              id="owner_phone"
              placeholder="Ej: Julieta Carabajal"
              aria-invalid={!!errors.owner_phone}
              {...control.register('owner_phone')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.owner_address}>
          <FormField
            htmlFor="owner_address"
            label="Dirección"
            error={errors.owner_address?.message}
            description="Opcional. Ayuda a identificar la ubicación de la mascota en caso de pérdida."
          >
            <Input
              type="text"
              id="owner_address"
              placeholder="Ej: Av. Siempre Viva 123"
              aria-invalid={!!errors.owner_address}
              {...control.register('owner_address')}
              disabled
            />
          </FormField>
        </Field>
      </CardContent>
    </Card>
  );
}
