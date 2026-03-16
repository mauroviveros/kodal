import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Field } from "@/components/shadcn/field";
import type { MedalFormProps } from "@/interfaces";
import { FormField } from "../FormField";
import { Icon } from "@iconify/react";
import { Textarea } from "@/components/shadcn/textarea";

export const EmergencyNotesForm = ({ control, errors }: MedalFormProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="lucide:alert-triangle" className="size-5 text-primary" />
        <CardTitle>Mensaje de Emergencia</CardTitle>
      </CardHeader>

      <CardContent>
        <Field data-invalid={!!errors.pet_notes}>
          <FormField
            htmlFor="pet_notes"
            label="Mensaje para quien encuentre a tu mascota"
            error={errors.pet_notes?.message}
            description="Este mensaje se mostrará en la medalla por si tu mascota se pierde. Máximo 500 caracteres."
          >
            <Textarea
              id="pet_notes"
              placeholder="Incluye información relevante como condiciones médicas, alergias o instrucciones especiales."
              aria-invalid={!!errors.pet_notes}
              className="h-40"
              {...control.register('pet_notes')}
            />
          </FormField>
        </Field>
      </CardContent>
    </Card>
  );
}
