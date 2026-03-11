import { Card, CardContent, CardHeader, CardTitle, Field, FieldDescription, FieldError, FieldLabel, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { Info } from "lucide-react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { InsertMedalInput } from "@/types/medal";
import { PET_ESPECIES, PET_GENDERS } from "@/constants";

export const PetForm = ({control, errors}: { control: Control<InsertMedalInput>, errors: FieldErrors<InsertMedalInput> }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Info className="size-5 text-primary"/>
        Información Básica
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <Controller
        name="pet.name"
        control={control}
        render={({ field: { value, ...field} }) => (
          <Field className="gap-1 md:col-span-2" data-invalid={!!errors.pet?.name}>
            <FieldLabel htmlFor="pet.name">Nombre</FieldLabel>
            <Input
              type="text"
              id="pet.name"
              placeholder="Ej: Brownie"
              required
              {...field}
              value={value || ""}
              aria-invalid={!!errors.pet?.name}
            />
            {errors.pet?.name ? (
              <FieldError>
                {errors.pet.name.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Nombre visible en el perfil de la mascota.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="pet.species"
        control={control}
        defaultValue="OTHER"
        render={({ field: { value, onChange } }) => (
          <Field
            className="gap-1"
            data-invalid={!!errors.pet?.species}
          >
            <FieldLabel htmlFor="pet.species">Tipo de mascota</FieldLabel>
            <Select
              onValueChange={onChange}
              defaultValue={value || "OTHER"}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.pet?.species}>
                <SelectValue placeholder="Selecciona la especie"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Especies</SelectLabel>
                  {PET_ESPECIES.map(({ value, label }) => (
                    <SelectItem value={value} key={value}>{label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.pet?.species ? (
              <FieldError>
                {errors.pet.species.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Selecciona la especie para personalizar el perfil.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="pet.breed"
        control={control}
        render={({ field: { value, ...field} }) => (
          <Field className="gap-1" data-invalid={!!errors.pet?.breed}>
            <FieldLabel htmlFor="pet.breed">Raza</FieldLabel>
            <Input
              type="text"
              id="pet.breed"
              placeholder="Ej: Panterita"
              {...field}
              value={value || ""}
              aria-invalid={!!errors.pet?.breed}
            />
            {errors.pet?.breed ? (
              <FieldError>
                {errors.pet.breed.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Ayuda a identificarla mejor.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="pet.gender"
        control={control}
        defaultValue="UNKNOWN"
        render={({ field: { value, onChange } }) => (
          <Field className="gap-1" data-invalid={!!errors.pet?.gender}>
            <FieldLabel htmlFor="pet.gender">Género</FieldLabel>
            <Select
              onValueChange={onChange}
              defaultValue={value ?? "UNKNOWN"}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.pet?.gender}>
                <SelectValue placeholder="Selecciona el género" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Géneros</SelectLabel>
                  {PET_GENDERS.map(({ value, label }) => (
                    <SelectItem value={value} key={value}>{label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.pet?.gender ? (
              <FieldError>
                {errors.pet.gender.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Selecciona el género para personalizar el perfil.
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="pet.birth_date"
        control={control}
        render={({ field: { value, ...field} }) => (
          <Field className="gap-1" data-invalid={!!errors.pet?.birth_date}>
            <FieldLabel htmlFor="pet.birth_date">Fecha de nacimiento</FieldLabel>
            <Input
              type="date"
              id="pet.birth_date"
              {...field}
              value={value || ""}
              aria-invalid={!!errors.pet?.birth_date}
            />
            {errors.pet?.birth_date ? (
              <FieldError>
                {errors.pet.birth_date.message}
              </FieldError>
            ) : (
              <FieldDescription>
                Si no la conoces, deja el campo vacío.
              </FieldDescription>
            )}
          </Field>
        )}
      />
    </CardContent>
  </Card>
);
