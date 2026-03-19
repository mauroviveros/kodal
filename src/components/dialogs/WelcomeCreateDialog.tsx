import { Icon } from "@iconify/react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../shadcn/dialog";
import { Button } from "../shadcn/button";

export const WelcomeCreateDialog = () => {
  const FEATURES = [
    {
      icon: "lucide:qr-code",
      title: "Código QR único",
      description: "Tu mascota tendrá un código QR exclusivo que cualquiera puede escanear para acceder a su información de contacto."
    },
    {
      icon: "lucide:shield-check",
      title: "Protección de datos",
      description: "Solo tú puedes editar la información mediante verificación por email."
    },
    {
      icon: "lucide:heart",
      title: "Contacto Inmediato",
      description: "Quien encuentre a tu mascota podrá contactarte con un solo toque."
    }
  ]

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-lg gap-2 max-h-[calc(100%-2rem)] overflow-y-auto" showCloseButton={false}>
        <DialogHeader className="text-center space-y-4">
          <span className="mx-auto size-20 bg-linear-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <Icon icon="lucide:sparkles" className="size-10 text-primary-foreground" />
          </span>

          <DialogTitle className="text-2xl">Bienvenido a Kodal!</DialogTitle>
          <DialogDescription className="text-base">
            Estas a punto de crear el perfil digital de tu mascota. Esta medalla inteligente ayudará a que tu compañero siempre pueda volver a casa.
          </DialogDescription>
        </DialogHeader>

        <ul className="py-6 space-y-4">
          {FEATURES.map(({ icon, title, description }) => (
            <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg" key={title}>
              <span className="size-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Icon icon={icon} className="size-4 text-primary" />
              </span>
              <article>
                <h5 className="font-medium text-sm">{title}</h5>
                <p className="text-xs text-muted-foreground">{description}</p>
              </article>
            </li>
          ))}
        </ul>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" size="lg">
              Comenzar
              <Icon icon="lucide:paw-print" className="size-4 ml-2" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
