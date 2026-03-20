import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Icon } from "@iconify/react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Input } from "@/components/shadcn/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { PET_GENDER_LABELS, PET_SPECIES_LABELS } from "@/constants";
import type { MedalInput } from "@/schemas";
import { Field } from "@/components/Field";

export const BasicForm = () => {
  const { register, control } = useFormContext<MedalInput>();
  const { errors: { pet: errors } } = useFormState({control, name: ['pet.birth_date', 'pet.breed', 'pet.gender', 'pet.name', 'pet.species']});

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:info" className="size-5 text-primary" />
        <CardTitle>Información Básica</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Field
          className="md:col-span-2"
          data-invalid={!!errors?.name}
          htmlFor="pet.name"
          label="Nombre"
          error={errors?.name?.message}
          description="Nombre visible en el perfil de la mascota."
          required
        >
          <Input
            id="pet.name"
            placeholder="Ej: Brownie"
            aria-invalid={!!errors?.name}
            {...register('pet.name', { value: '' })}
          />
        </Field>

        <Field
          data-invalid={!!errors?.species}
          htmlFor="pet.species"
          label="Especie"
          error={errors?.species?.message}
          description="La especie personaliza la medalla."
          required
        >
          <Controller
            name="pet.species"
            control={control}
            render={({ field: { onChange, value, ...field }}) => (
              <Select
                onValueChange={onChange}
                defaultValue={value}
                {...field}
              >
                <SelectTrigger
                  aria-invalid={!!errors?.species}
                >
                  <SelectValue placeholder="Selecciona una especie" aria-invalid />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Especies</SelectLabel>
                    {Object.entries(PET_SPECIES_LABELS).map(([key, { label, icon }]) => (
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
          data-invalid={!!errors?.breed}
          htmlFor="pet.breed"
          label="Raza"
          error={errors?.breed?.message}
          description="Opcional. Ayuda a identificarla mejor."
        >
          <Input
            id="pet.breed"
            placeholder="Ej: Panterita"
            aria-invalid={!!errors?.breed}
            {...register('pet.breed', { value: '' })}
          />
        </Field>

        <Field
          data-invalid={!!errors?.gender}
          htmlFor="pet.gender"
          label="Género"
          error={errors?.gender?.message}
          description="El género personaliza la medalla."
          required
        >
          <Controller
            name="pet.gender"
            control={control}
            render={({ field: { onChange, value, ...field }}) => (
              <Select
                onValueChange={onChange}
                defaultValue={value}
                {...field}
              >
                <SelectTrigger
                  aria-invalid={!!errors?.gender}
                >
                  <SelectValue placeholder="Selecciona un género" aria-invalid />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Géneros</SelectLabel>
                    {Object.entries(PET_GENDER_LABELS).map(([key, {label, icon}]) => (
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
          data-invalid={!!errors?.birth_date}
          htmlFor="pet.birth_date"
          label="Fecha de nacimiento"
          error={errors?.birth_date?.message}
          description="Si no la conoces, deja el campo vacío."
        >
          <Input
            type="date"
            id="pet.birth_date"
            aria-invalid={!!errors?.birth_date}
            {...register('pet.birth_date', { value: '' })}
          />
        </Field>
      </CardContent>
    </Card>
  )
}
