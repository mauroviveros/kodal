import { Form, FormProvider, useForm, type FormSubmitHandler } from "react-hook-form"
import { BasicForm } from "./forms/BasicForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedalSchema, type MedalInput } from "./types";
import { OwnerForm } from "./forms/OwnerForm";
import { NotesForm } from "./forms/NotesForm";
import { Button } from "../shadcn/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import type { Tables } from "@/interfaces";
import { ActionError, actions, type SafeResult } from "astro:actions";
import { AvatarForm } from "./forms/AvatarForm";

type PropsCreate = {
  method: "POST";
  medal_id: Tables<"medals">["id"];
}
type PropsEdit = {
  method: "PUT";
  medal_id: Tables<"medals">["id"];
  token_code: Tables<"tokens">["code"];
  pet: Tables<"pets">;
  owner: Tables<"owners">;
};
type Props = PropsCreate | PropsEdit;
export const MedalForm = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<ActionError | null>(null);
  const methods = useForm<MedalInput>({
    resolver: zodResolver(MedalSchema),
    disabled: isSubmitting,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      pet: props.method === "PUT" ? Object.assign({...props.pet}) : {},
      owner: props.method === "PUT" ? Object.assign({...props.owner}) : {},
    }
  });


  const onSubmit: FormSubmitHandler<MedalInput> = async ({ data, formData }) => {
    setIsSubmitting(true);
    setErrors(null);
    let result;
    formData.append("medal_id", props.medal_id);

    if (props.method === "PUT") {
      formData.append("token_code", props.token_code);
      result = await actions.updatePet(formData);
    } else {
      result = await actions.createPet(formData);
    }

    if(result?.data) {
      window.location.assign(`/medal/${props.medal_id || ''}`);
    } else if(result?.error) {
      setErrors(result.error);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsSubmitting(false);
  }

  return (
    <FormProvider {...methods}>
      <Form
        control={methods.control}
        className="space-y-4"
        onSubmit={onSubmit}
      >
        {errors && (
          <blockquote className="bg-error text-error-foreground p-4 flex items-center">
            <Icon icon="lucide:x-circle" className="size-5 inline-block mr-2" />
            {errors.message}
          </blockquote>
        )}

        <AvatarForm
          avatar_path={props.method === "PUT" ? props.pet.avatar_path : null}
          updated_at={props.method === "PUT" ? props.pet.updated_at : null}
        />
        <BasicForm />
        <OwnerForm />
        <NotesForm />

        <footer className="flex flex-col-reverse md:grid md:grid-cols-2 gap-2">
          {props.method === "PUT" && (
            <Button type="button" variant="outline" disabled={isSubmitting} asChild>
              <a href={`/medal/${props.medal_id}`}>Cancelar</a>
            </Button>
          )}
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting || !methods.formState.isValid}
            className={props.method === "PUT" ? "" : "col-span-2"}
          >
            <Icon icon="lucide:save" className="size-4" />
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </footer>
      </Form>
    </FormProvider>
  )
}
