import type { Tables } from "@/interfaces";
import { actions, type SafeResult } from "astro:actions";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { MedalFormEditSchema, type MedalFormEditInput } from "@/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicForm } from "./BasicForm";
import { convertToDefaultValues } from "@/utils";
import { Button } from "@/components/shadcn/button";
import { Icon } from "@iconify/react";
import { OwnerForm } from "./OwnerForm";
import { EmergencyNotesForm } from "./EmergencyForm";

type Props = {
  medal_id: Tables<'medals'>['id'];
  token_code: Tables<'tokens'>['code'];
  pet: Tables<'pets'>,
  owner: Tables<'owners'>,
};

export const MedalFormEdit = ({ medal_id, token_code, pet, owner }: Props) => {
  const [state, setState] = useState<SafeResult<MedalFormEditInput, string> | null>(null);
  const { control, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<MedalFormEditInput>({
    resolver: zodResolver(MedalFormEditSchema),
    defaultValues: {
      medal_id,
      token_code,
      pet: Object.assign({...pet}),
      owner: Object.assign({...owner}),
    }
  });

  useEffect(() => {
    console.log(state);
  }, [state])

  const onSubmit: SubmitHandler<MedalFormEditInput> = async (data) => {
    setState(null);
    const result = await actions.updatePet(data);
    setState(result);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {state?.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          <Icon icon="lucide:x-circle" className="size-5 inline-block mr-2" />
          {state.error.message}
        </div>
      )}

      <input type="hidden" {...control.register('medal_id')} />
      <input type="hidden" {...control.register('token_code')} />

      <BasicForm control={control} errors={errors} />
      <OwnerForm control={control} errors={errors} />
      <EmergencyNotesForm control={control} errors={errors} />

      <footer className="flex flex-col-reverse md:grid md:grid-cols-2 gap-2">
        <Button type="button" variant="outline" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="default" disabled={isSubmitting || !isValid}>
          <Icon icon="lucide:save" className="size-4" />
          {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </footer>
    </form>
  );
};
