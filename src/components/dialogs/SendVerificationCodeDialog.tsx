import { Icon } from "@iconify/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/dialog"
import { Field } from "../forms/Field"
import { Input } from "../shadcn/input"
import { Button } from "../shadcn/button"
import { FieldDescription } from "../shadcn/field"
import { useActionState, useEffect } from "react"
import { actions, isInputError } from "astro:actions"
import type { Tables } from "@/interfaces"
import { withState } from '@astrojs/react/actions';

interface Props {
  medal_id: Tables<'medals'>['id'];
  pet_name: Tables<'pets'>['name'];
  email_hint: string;
}
export const SendVerificationCodeDialog = ({ medal_id, pet_name, email_hint }: Props) => {
  const [state, action, pending] = useActionState(
    withState(actions.sendVerificationCode),
    { data: '', error: undefined }
  );

  useEffect(() => {
    if(!(!state?.error && state?.data !== '')) return;
    window.location.assign(`/medal/${medal_id}/email-sent`);
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Icon icon="lucide:edit" className="size-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon icon="lucide:shield" className="size-5 text-primary" />
              Verificación de Identidad
            </DialogTitle>
            <DialogDescription>Para proteger la información de tu mascota, necesitamos verificar que eres el dueño.</DialogDescription>
          </DialogHeader>

          <form action={action} className="space-y-4">
            <input type="hidden" name="medal_id" value={medal_id} />
            <input type="hidden" name="pet_name" value={pet_name} />

            <Field
              label="Ingresa el email registrado"
              data-invalid={!!state.error}
              required
              >
              <Input
                type="email"
                name="email"
                required
                placeholder="Ej: tu@email.com"
                aria-invalid={!!state.error}
                disabled={pending}
                />
                <FieldDescription>{`Pista2: ${email_hint}`}</FieldDescription>
            </Field>

            {state?.error && (
              <blockquote className="bg-error text-error-foreground border border-danger rounded-lg p-3">
                <p className="text-sm">{(isInputError(state.error) ? state.error.issues[0].message : state.error.message)}</p>
              </blockquote>
            )}

            <blockquote className="bg-primary/5 text-muted-foreground border border-primary/20 rounded-lg p-3">
              <p className="text-sm text-balance">Te enviaremos un código de verificación que expira en 15 minutos.</p>
            </blockquote>

            <DialogFooter>
              <Button type="button" variant="outline" disabled={pending}>
                Cancelar
              </Button>

              <Button type="submit" disabled={pending}>
                <Icon icon="lucide:mail" />
                {pending ? "Enviando..." : "Enviar codigo"}
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  )
}
