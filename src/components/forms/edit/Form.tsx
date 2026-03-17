import type { Tables } from "@/interfaces";
import { actions, type SafeResult } from "astro:actions";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { MedalFormEditSchema, type MedalFormEditInput } from "@/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicForm } from "./BasicForm";
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
  const [isSubmitting, startSubmiting] = useTransition();
  const [state, setState] = useState<SafeResult<MedalFormEditInput, string> | null>(null);
  const { control, handleSubmit, formState: { errors, isValid, isReady } } = useForm<MedalFormEditInput>({
    resolver: zodResolver(MedalFormEditSchema),
    mode: "all",
    disabled: isSubmitting,
    defaultValues: {
      medal_id,
      token_code,
      pet: Object.assign({...pet}),
      owner: Object.assign({...owner}),
    }
  });

  const onSubmit: SubmitHandler<MedalFormEditInput> = (data) => {
    setState(null);
    startSubmiting(async () => {
      const result = await actions.updatePet(data);
      setState(result);
      if(result?.data) window.location.assign(`/medal/${medal_id}`);
      else if(result?.error) window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if(!isReady) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {state?.error && (
        <blockquote className="bg-danger text-danger-foreground p-4 flex items-center">
          <Icon icon="lucide:x-circle" className="size-5 inline-block mr-2" />
          {state.error.message}
        </blockquote>
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
