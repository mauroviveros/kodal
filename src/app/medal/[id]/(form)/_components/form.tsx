'use client'
import { useForm } from "react-hook-form"
import { InsertMedalInput, InsertMedalSchema } from "@/types/medal";
import { PetForm } from "./pet-form";
import { Tables } from "@/types";
import { Button } from "@/components/ui";
import { Save } from "lucide-react";
import { startTransition, useActionState } from "react";
import { insertMedal, updateMedal } from "@/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { OwnerForm } from "./owner-form";

type Props = {
  pet?: Tables<'medal_pets'> | null,
  owner?: Tables<'medal_owners'> | null,
  method: 'POST' | 'PUT',
}
export const MedalForm = ({ pet, owner, method }: Props) => {
  const [
    state,
    dispatch,
    isPending
  ] = useActionState(
    method === 'POST' ? insertMedal : updateMedal,
    { success: false }
  );
  const {
    control,
    handleSubmit,
    formState: { errors, isReady }
  } = useForm<InsertMedalInput>({
    resolver: zodResolver(InsertMedalSchema),
    defaultValues: Object.assign({ pet, owner }),
    disabled: isPending,
  });

  const onSubmit = async (payload: InsertMedalInput) => {
    startTransition(async () => {
      await dispatch(payload);
    })
  }

  if (!isReady) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PetForm control={control} errors={errors} />
      <OwnerForm control={control} errors={errors} />

      {/* {submitCount > 0 && !state.success && !isPending && (
        <p className="text-sm text-destructive">No pudimos guardar la información. Revisa los campos e intenta otra vez.</p>
      )} */}

      <footer className="flex gap-2">
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          disabled={isPending}
        >
          <Save />
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
      </footer>
    </form>
  )
}
