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
        <Field className="md:col-span-2" data-invalid={!!errors.pet_name}>
          <FormField
            htmlFor="pet_name"
            label="Nombre"
            error={errors.pet_name?.message}
            description="Nombre visible en el perfil de la mascota."
            required
          >
            <Input
              id="pet_name"
              placeholder="Ej: Brownie"
              aria-invalid={!!errors.pet_name}
              {...control.register('pet_name')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.pet_species}>
          <FormField
            htmlFor="pet_species"
            label="Especie"
            error={errors.pet_species?.message}
            description="La especie personaliza la medalla."
            required
          >
            <Controller
              name="pet_species"
              control={control}
              render={({ field: { onChange, value, ...field }}) => (
                <Select
                  onValueChange={onChange}
                  defaultValue={value}
                  {...field}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.pet_species}
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

        <Field data-invalid={!!errors.pet_breed}>
          <FormField
            htmlFor="pet_breed"
            label="Raza"
            error={errors.pet_breed?.message}
            description="Opcional. Ayuda a identificarla mejor."
          >
            <Input
              id="pet_breed"
              placeholder="Ej: Panterita"
              aria-invalid={!!errors.pet_breed}
              {...control.register('pet_breed')}
            />
          </FormField>
        </Field>

        <Field data-invalid={!!errors.pet_gender}>
          <FormField
            htmlFor="pet_gender"
            label="Género"
            error={errors.pet_gender?.message}
            description="El género personaliza la medalla."
            required
          >
            <Controller
              name="pet_gender"
              control={control}
              render={({ field: { onChange, value, ...field }}) => (
                <Select
                  onValueChange={onChange}
                  defaultValue={value}
                  {...field}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.pet_gender}
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

        <Field data-invalid={!!errors.pet_birth_date}>
          <FormField
            htmlFor="pet_birth_date"
            label="Fecha de nacimiento"
            error={errors.pet_birth_date?.message}
            description="Si no la conoces, deja el campo vacío."
          >
            <Input
              type="date"
              id="pet_birth_date"
              aria-invalid={!!errors.pet_birth_date}
              {...control.register('pet_birth_date')}
            />
          </FormField>
        </Field>
      </CardContent>
    </Card>
  );
}
