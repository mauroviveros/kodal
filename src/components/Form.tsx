import { formSchema, type FormSchema } from "@schemas";
import type { Tables } from "@types";
import { useForm, Form as FormRHF } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarForm, BasicForm, FormError, FormFooter, OwnerForm } from "./form/index";
import { useState } from "react";

interface Props {
  method: 'POST' | 'PUT';
  medal_id: string;
  token_code?: string | null;
  pet?: Tables<'medal_pets'>
  owner?: Tables<'medal_owners'> | null;
  avatar_url?: string | null;
}

export const Form = (
  {
    method,
    medal_id,
    token_code,
    pet,
    owner,
    avatar_url
  }: Props
) => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<string>('');
  const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    disabled,
    defaultValues: Object.assign({
      medal_id,
      token_code: token_code || undefined,
      avatar_file: undefined,
      pet: {
        ...pet,
        id: pet?.id || undefined,
        species: pet?.species || 'OTHER',
        gender: pet?.gender || 'UNKNOWN'
      },
      owner: {
        ...owner,
        id: owner?.id || undefined,
        relation_type: owner?.relation_type || 'OWNER'
      }
    })
  });

  const onSubmit = (body: FormData) => {
    setDisabled(true);

    fetch(
      `/api/medal/${medal_id}`,
      { method, body }
    ).then(async (response) => {
      if (!response.ok) throw (await response.json()).error;

      window.location.assign(`/medal/${medal_id}`);
    }).catch((error: { message: string }) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setError(error.message || 'An unexpected error occurred');
    }).finally(() => {
      setDisabled(false);
    })



    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  return (
    <FormRHF
      className="flex flex-col gap-6"
      control={control}
      onSubmit={async ({data: { avatar_file, ...data }}) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (avatar_file) formData.append('avatar_file', avatar_file);
        onSubmit(formData);
      }}
      encType="multipart/form-data"
    >
      {error && <FormError method={method} error={error} />}

      <input type="hidden" {...control.register('medal_id')} />
      <input type="hidden" {...control.register('token_code')} />

      <AvatarForm control={control} errors={errors} avatar_url={avatar_url || undefined} />
      <BasicForm control={control} errors={errors} />
      <OwnerForm control={control} errors={errors} />

      <FormFooter method={method} medal_id={medal_id} disabled={disabled} />
    </FormRHF>
  );
}
