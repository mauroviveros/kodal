import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Field } from "../Field";
import { Icon } from "@iconify/react";
import { Textarea } from "@/components/shadcn/textarea";
import type { MedalFormEditProps } from "@/schemas";

export const EmergencyNotesForm = ({ control, errors }: MedalFormEditProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:alert-triangle" className="size-5 text-primary" />
        <CardTitle>Mensaje de Emergencia</CardTitle>
      </CardHeader>

      <CardContent>
        <Field
          data-invalid={!!errors.pet?.notes}
          htmlFor="pet.notes"
          label="Mensaje para quien encuentre a tu mascota"
          error={errors.pet?.notes?.message}
          description="Este mensaje se mostrará en la medalla por si tu mascota se pierde. Máximo 500 caracteres."
        >
          <Textarea
            id="pet.notes"
            placeholder="Incluye información relevante como condiciones médicas, alergias o instrucciones especiales."
            aria-invalid={!!errors.pet?.notes}
            className="h-40"
            {...control.register('pet.notes')}
          />
        </Field>
      </CardContent>
    </Card>
  );
}
