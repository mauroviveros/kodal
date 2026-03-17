import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Field } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { PET_GENDER_LABELS, PET_SPECIES_LABELS } from "@/constants";
import type { MedalFormProps } from "@/interfaces";
import { Icon } from '@iconify/react';
import { Controller } from "react-hook-form";
import { FormField } from "../FormField";

export const BasicForm = ({ control, errors }: MedalFormProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:info" className="size-5 text-primary" />
        <CardTitle>Información Básica</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Field className="md:col-span-2" data-invalid={!!errors.pet?.name}>
          <FormField
            htmlFor="pet.name"
            label="Nombre"
            error={errors.pet?.name?.message}
            description="Nombre visible en el perfil de la mascota."
            required
          >
            <Input
              id="pet.name"
              placeholder="Ej: Brownie"
              aria-invalid={!!errors.pet?.name}
              {...control.register('pet.name', { value: '' })}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.pet?.species}>
          <FormField
            htmlFor="pet.species"
            label="Especie"
            error={errors.pet?.species?.message}
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
                    aria-invalid={!!errors.pet?.species}
                  >
                    <SelectValue placeholder="Selecciona una especie" aria-invalid />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Especies</SelectLabel>
                      {Object.entries(PET_SPECIES_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.pet?.breed}>
          <FormField
            htmlFor="pet.breed"
            label="Raza"
            error={errors.pet?.breed?.message}
            description="Opcional. Ayuda a identificarla mejor."
          >
            <Input
              id="pet.breed"
              placeholder="Ej: Panterita"
              aria-invalid={!!errors.pet?.breed}
              {...control.register('pet.breed', { value: '' })}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.pet?.gender}>
          <FormField
            htmlFor="pet.gender"
            label="Género"
            error={errors.pet?.gender?.message}
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
                    aria-invalid={!!errors.pet?.gender}
                  >
                    <SelectValue placeholder="Selecciona un género" aria-invalid />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Géneros</SelectLabel>
                      {Object.entries(PET_GENDER_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.pet?.birth_date}>
          <FormField
            htmlFor="pet.birth_date"
            label="Fecha de nacimiento"
            error={errors.pet?.birth_date?.message}
            description="Si no la conoces, deja el campo vacío."
          >
            <Input
              type="date"
              id="pet.birth_date"
              aria-invalid={!!errors.pet?.birth_date}
              {...control.register('pet.birth_date', { value: '' })}
            />
          </FormField>
        </Field>
      </CardContent>
    </Card>
  );
}
