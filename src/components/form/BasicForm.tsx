
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Input, Select } from "./FormField";
import { PET_ESPECIES, PET_GENDERS } from "@constants";
import type { FormSchema } from "@schemas";

interface Props {
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
}
export const BasicForm = ({ control, errors }: Props) => (
  <section className="card">
    <h2 className="text-balance px-6 font-semibold text-foreground">
      <Icon icon="lucide:info" className="mr-2 inline-block text-primary" />
      Información Básica
    </h2>

    <div className="p-6 grid grid-cols-1 space-y-2 space-x-2 md:grid-cols-2">
      <input type="hidden" {...control.register('pet.id')} />

      <Controller
        name="pet.name"
        control={control}
        render={({ field }) => (
          <Input
            label="Nombre"
            className="md:col-span-2"
            placeholder="Ej: Brownie"
            helper="Nombre visible en el perfil de la mascota."
            error={errors.pet?.name}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="pet.species"
        control={control}
        render={({ field }) => (
          <Select
            label="Tipo de mascota"
            helper="Selecciona la especie para personalizar el perfil."
            items={PET_ESPECIES}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="pet.breed"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            label="Raza"
            placeholder="Ej: Panterita"
            helper="Opcional. Ayuda a identificarla mejor."
            {...field}
          />
        )}
      />

      <Controller
        name="pet.gender"
        control={control}
        render={({ field }) => (
          <Select
            label="Género"
            helper="Indica el género de la mascota."
            items={PET_GENDERS}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="pet.birth_date"
        control={control}
        render={({ field }) => (
          <Input
            type="date"
            label="Fecha de nacimiento"
            helper="Si no la conoces, deja el campo vacío."
            {...field}
          />
        )}
      />
    </div>
  </section>
);
