import type { Tables } from "@/interfaces";
import { actions } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import { Form, useForm, type FormSubmitHandler } from "react-hook-form"
import { MedalFormSchema, type MedalFormInput } from "@/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from "react";
import { BasicForm } from "./BasicForm";
import { convertToDefaultValues } from "@/utils";
import { Button } from "@/components/shadcn/button";
import { Icon } from "@iconify/react";
import { OwnerForm } from "./OwnerForm";
import { EmergencyNotesForm } from "./EmergencyForm";

type Props = {
  medal_id: string;
  pet: Tables<'pets'>,
  owner: Tables<'owners'>,
};

export const MedalFormEdit = ({ medal_id, pet, owner }: Props) => {
  const [state, action, pending] = useActionState(
    withState(actions.updatePet),
    { data: medal_id, error: undefined },
  );
  const { control, formState: { errors, isValid } } = useForm<MedalFormInput>({
    resolver: zodResolver(MedalFormSchema),
    disabled: pending,
    defaultValues: { id: medal_id, ...convertToDefaultValues(pet, owner)},
  });

  const onSubmit: FormSubmitHandler<MedalFormInput> = ({ formData }) => {
    startTransition(() => action(formData));
  }

  return (
    <Form onSubmit={onSubmit} control={control} className="space-y-4" encType="multipart/form-data">
      {state.error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md" role="alert">
          <Icon icon="lucide:x-circle" className="size-5 inline-block mr-2" />
          {state.error.message}
        </div>
      )}

      <input type="hidden" {...control.register('id')} />
      <BasicForm control={control} errors={errors} />
      <OwnerForm control={control} errors={errors} />
      <EmergencyNotesForm control={control} errors={errors} />

      <footer className="flex flex-col-reverse md:grid md:grid-cols-2 gap-2">
        <Button type="button" variant="outline" disabled={pending}>
          Cancelar
        </Button>
        <Button type="submit" variant="default" disabled={pending || !isValid}>
          <Icon icon="lucide:save" className="size-4" />
          {pending ? "Guardando..." : "Guardar"}
        </Button>
      </footer>
    </Form>
  );
};
