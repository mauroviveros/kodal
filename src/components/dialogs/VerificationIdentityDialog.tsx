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
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Edit, Mail, Shield } from "lucide-react"
import { Avatar } from "../Avatar"
import { Tables } from "@/types"

type Props = {
  pet: Tables<"medal_pets">;
}
export const VerificationIdentityDialog = ({ pet }: Props) => (
  <form action="">
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

          <article>
            <Field className="gap-1">
              <FieldLabel className="gap-y-0 flex-wrap">
                Ingresa el email registrado:
                <FieldDescription>mxxxxxxxxxxxxx@gxxxx.cxx</FieldDescription>
              </FieldLabel>

              <Input
                type="email"
                placeholder="tu@email.com"
                required
              />
              {/* <FieldError>Validation message.</FieldError> */}
            </Field>
          </article>
        </section>



        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" >
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" className="space-x-2">
            <Mail className="size-4" />
            Verificar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </form>
)