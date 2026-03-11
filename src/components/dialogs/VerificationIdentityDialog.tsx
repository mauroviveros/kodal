"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Edit, Loader2, Mail, Shield } from "lucide-react"
import { Avatar } from "../Avatar"
import { Tables } from "@/types"
import { useActionState, useEffect } from "react"
import { sendValidationIdentityEmail } from "@/app/actions"
import { redirect } from "next/navigation"

type Props = {
  medal_id: string;
  pet: Tables<"medal_pets">;
}
export const VerificationIdentityDialog = ({ medal_id, pet }: Props) => {
  const [state, action, isPending] = useActionState(sendValidationIdentityEmail, { error: '', success: false });

  useEffect(() => {
    if (state.success){
      redirect(`/medal/${medal_id}/email-sent`)
    }
  }, [medal_id, state.success])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Edit />
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            Verificación de identidad
          </DialogTitle>
          <DialogDescription>
            Para proteger la informacion de tu mascota, necesitamos verificar que eres el dueño.
          </DialogDescription>
        </DialogHeader>

        <section className="space-y-2">
          <article className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
            <Avatar path={pet.avatar_path} name={pet.name} className="w-10 h-10" />

            <div>
              <p className="font-medium">{pet.name}</p>
              <p className="text-sm text-muted-foreground">{pet.breed}</p>
            </div>
          </article>

          <form action={action} id="verification-identity-form">
            <Field className="gap-1">
              <FieldLabel className="gap-y-0 flex-wrap" htmlFor="verification-email">
                Ingresa el email registrado:
                <FieldDescription>mxxxxxxxxxxxxx@gxxxx.cxx</FieldDescription>
              </FieldLabel>

              <input type="hidden" name="medal_id" value={medal_id} />

              <Input
                type="email"
                id="verification-email"
                name="email"
                placeholder="tu@email.com"
                required
              />

              {state.error && (
                <FieldError>{state.error}</FieldError>
              )}
            </Field>
          </form>
        </section>



        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="space-x-2"
            disabled={isPending}
            form="verification-identity-form"
          >
            <Mail className="size-4" />
            Verificar

            {isPending && <Loader2 className="size-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
