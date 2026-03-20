import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Icon } from "@iconify/react"
import { Textarea } from "@/components/shadcn/textarea"
import { useFormContext, useFormState } from "react-hook-form"
import type { MedalInput } from "@/schemas";
import { Field } from "@/components/Field";

export const NotesForm = () => {
  const { register, control } = useFormContext<MedalInput>();
  const { errors: { pet: errors } } = useFormState({control, name: 'pet.notes'});
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:alert-triangle" className="size-5 text-primary" />
        <CardTitle>Mensaje de Emergencia</CardTitle>
      </CardHeader>

      <CardContent>
        <Field
          data-invalid={!!errors?.notes}
          htmlFor="pet.notes"
          label="Mensaje para quien encuentre a tu mascota"
          error={errors?.notes?.message}
          description="Este mensaje se mostrará en la medalla por si tu mascota se pierde. Máximo 500 caracteres."
        >
          <Textarea
            id="pet.notes"
            placeholder="Incluye información relevante como condiciones médicas, alergias o instrucciones especiales."
            aria-invalid={!!errors?.notes}
            className="h-40"
            {...register('pet.notes')}
          />
        </Field>
      </CardContent>
    </Card>
  )
}
