import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/supabase";
import { cn } from "@/utils";
import { ArrowLeft, Clock, Headset, Mail, MailCheck } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function EmailSentPage({ params }: Props) {
  const { id } = await params;

  const { data: medal } = await supabase.from("medals")
    .select("id, pet:medal_pets(name), owner:medal_owners(email)")
    .eq("id", id)
    .maybeSingle()

  return (
    <>
      <span className="bg-primary/10 relative mx-auto flex size-24 items-center justify-center rounded-full">
        <MailCheck className="size-12 text-primary" />
        <div className="bg-primary absolute -top-1 -right-1 flex size-8 animate-bounce items-center justify-center rounded-full">
          <span className="bg-primary text-primary-foreground text-sm font-bold">1</span>
        </div>
      </span>

      <Card className="shadow-lg max-w-lg mx-auto">
        <CardContent className="p-4 sm:p-8 text-center">
          <hgroup className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
              Email de verificación enviado
            </h1>

            <p className="text-muted-foreground mb-6 text-pretty max-w-sm mx-auto">
              Hemos enviado un enlace de verificación para que puedas editar el perfil de <strong>{medal?.pet?.name}</strong>
            </p>
          </hgroup>

          <article className="bg-muted/50 rounded-lg p-4 mb-6 flex items-center justify-center gap-3">
            <Mail className="size-5 text-primary" />
            <span className="font-medium text-foreground">{medal?.owner?.email}</span>
          </article>

          <ol className="space-y-4 text-left mb-6">
            <li className="relative pl-8">
              <Marker num={1} />
              <p className="text-foreground font-medium">Revisa tu bandeja de entrada</p>
              <p className="text-muted-foreground text-sm text-balance">
                Busca un correo de Kodal con el asunto {' '}
                <span>&quot;<u>Verificación de Identidad para {medal?.pet?.name}</u>&quot;</span>
              </p>
            </li>

            <li className="relative pl-8">
              <Marker num={2} />
              <p className="text-foreground font-medium">Haz clic en el enlace</p>
              <p className="text-muted-foreground text-sm text-balance">El enlace te llevará a una página donde podrás editar la información de tu mascota.</p>
            </li>

            <li className="relative pl-8">
              <Marker num={3} isDone={false}/>
              <p className="text-foreground font-medium">Edita el perfil de {medal?.pet?.name}</p>
              <p className="text-muted-foreground text-sm text-balance">Una vez que hayas editado la información, guarda los cambios y tu mascota estará actualizada en nuestra base de datos.</p>
            </li>
          </ol>

          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-700">
            <Clock className="size-4"/>
            <span>El enlace expira en 15 minutos</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg max-w-lg mx-auto">
        <CardContent className="p-6">
          <h2 className="font-semibold text-foreground mb-3">No recibiste el correo?</h2>

          <ul className="marker:text-primary list-inside list-disc mb-4">
            <li>Revisa tu carpeta de spam o correo no deseado</li>
            <li>Verifica que el email registrado sea correcto</li>
            <li>Espera unos minutos, a veces puede demorar</li>
          </ul>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/medal/${medal?.id}`} className="flex-1">
                  <ArrowLeft />
                  Volver
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support" className="flex-1">
                  <Headset />
                  Contactar soporte
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

const Marker = ({num, isDone=true}: {num: number, isDone?: boolean}) => {

  return (
    <span className={cn([
      "absolute left-0 flex size-6 items-center justify-center rounded-full text-sm font-bold",
      isDone ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-muted-foreground'
    ])}>
      {num}
    </span>
  )
}
