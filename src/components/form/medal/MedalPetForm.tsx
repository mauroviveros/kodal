import { Card, CardContent, CardHeader, CardTitle, Field, FieldDescription, FieldLabel, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { Info } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { InsertMedalInput } from "@/types/medal";
import { PET_ESPECIES, PET_GENDERS } from "@/constants";

type Props = {
  control: Control<InsertMedalInput>;
}
export const MedalPetForm = ({control}: Props) => (
  <Card>
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
        render={({ field }) => (
          <Field className="gap-1 md:col-span-2">
            <FieldLabel htmlFor="pet.name">Nombre</FieldLabel>
            <Input
              type="text"
              id="pet.name"
              placeholder="Ej: Brownie"
              required
              {...field}
            />
            <FieldDescription>
              Nombre visible en el perfil de la mascota.
            </FieldDescription>
          </Field>
        )}
      />

      <Controller
        name="pet.species"
        control={control}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel htmlFor="pet.species">Tipo de mascota</FieldLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona la especie" />
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
            <FieldDescription>
              Selecciona la especie para personalizar el perfil.
            </FieldDescription>
          </Field>
        )}
      />

      <Controller
        name="pet.breed"
        control={control}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel htmlFor="pet.breed">Raza</FieldLabel>
            <Input
              type="text"
              id="pet.breed"
              placeholder="Ej: Panterita"
              {...field}
            />
            <FieldDescription>
              Ayuda a identificarla mejor.
            </FieldDescription>
          </Field>
        )}
      />

      <Controller
        name="pet.gender"
        control={control}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel htmlFor="pet.gender">Género</FieldLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
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
            <FieldDescription>
              Selecciona el género para personalizar el perfil.
            </FieldDescription>
          </Field>
        )}
      />
    </CardContent>
  </Card>
);
