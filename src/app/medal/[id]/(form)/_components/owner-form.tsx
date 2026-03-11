import { Card, CardContent, CardHeader, CardTitle, Field, FieldDescription, FieldError, FieldLabel, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { CONTACT_RELATIONS } from "@/constants";
import { InsertMedalInput } from "@/types/medal";
import { Contact } from "lucide-react";
import { Control, Controller, FieldErrors } from "react-hook-form";

export const OwnerForm = ({control, errors}: { control: Control<InsertMedalInput>, errors: FieldErrors<InsertMedalInput> }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Contact  className="size-5 text-primary"/>
        Datos de contacto
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-2">
      <Controller
        name="owner.relation_type"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Field
            className="gap-1"
            data-invalid={!!errors.owner?.relation_type}
          >
            <FieldLabel htmlFor="owner.relation_type">Tipo de mascota</FieldLabel>
            <Select
              onValueChange={onChange}
              defaultValue={value || "OWNER"}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.owner?.relation_type}>
                <SelectValue placeholder="Selecciona su tipo de relación"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de relación</SelectLabel>
                  {CONTACT_RELATIONS.map(({ value, label }) => (
                    <SelectItem value={value} key={value}>{label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.owner?.relation_type ? (
              <FieldError>
                {errors.owner.relation_type.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Indica tu relación con la mascota.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="owner.full_name"
        control={control}
        render={({ field: { value, ...field} }) => (
          <Field className="gap-1 md:col-span-2" data-invalid={!!errors.owner?.full_name}>
            <FieldLabel htmlFor="owner.full_name">Nombre completo</FieldLabel>
            <Input
              type="text"
              id="owner.full_name"
              placeholder="Ej: Julieta Carabajal"
              required
              {...field}
              value={value || ""}
              aria-invalid={!!errors.owner?.full_name}
            />
            {errors.owner?.full_name ? (
              <FieldError>
                {errors.owner.full_name.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Nombre de la persona a contactar.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="owner.email"
        control={control}
        render={({ field: { value, ...field} }) => (
          <Field className="gap-1 md:col-span-2" data-invalid={!!errors.owner?.email}>
            <FieldLabel htmlFor="owner.email">Correo electrónico</FieldLabel>
            <Input
              type="email"
              id="owner.email"
              placeholder="Ej: tu@email.com"
              required
              {...field}
              value={value || ""}
              aria-invalid={!!errors.owner?.email}
            />
            {errors.owner?.email ? (
              <FieldError>
                {errors.owner.email.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Correo de contacto para recibir notificaciones.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="owner.phone"
        control={control}
        render={({ field: { value, ...field} }) => (
          <Field className="gap-1 md:col-span-2" data-invalid={!!errors.owner?.phone}>
            <FieldLabel htmlFor="owner.phone">Teléfono de contacto</FieldLabel>
            <Input
              type="tel"
              id="owner.phone"
              placeholder="Ej: +54 9 11 1234-5678"
              required
              {...field}
              value={value || ""}
              aria-invalid={!!errors.owner?.phone}
            />
            {errors.owner?.phone ? (
              <FieldError>
                {errors.owner.phone.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Incluye el código de área para asegurar que podamos contactarte por Whatsapp.
              </FieldDescription>
            )}
          </Field>
        )}
      />
    </CardContent>
  </Card>
  )
