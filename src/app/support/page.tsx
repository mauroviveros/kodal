import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SUPPORT_CONTACT_METHODS, SUPPORT_FREQUENTLY_ASKED_QUESTIONS } from "@/constants";
import { Headset, HelpCircle, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="container mx-auto px-4 pb-6 max-w-4xl space-y-6 grow pt-22">
      <header className="mb-8 text-center">
        <Headset className="text-primary mx-auto mb-4 size-16"/>
        <h1 className="mb-2 text-3xl font-bold">Centro de Soporte</h1>
        <p className="text-muted-foreground">Estamos aquí para ayudarte con tu medalla inteligente Kodal</p>
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <MessageCircle className="text-primary size-5" />
              Métodos de contacto
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {
              SUPPORT_CONTACT_METHODS.map(({ method, contact, description, Icon }) => (
                <div className="bg-muted/30 flex items-center gap-4 rounded-lg p-4" key={method}>
                  <span className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                    <Icon className="text-primary size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium">{method}</h3>
                    <p className="text-primary">{contact}</p>
                    <p className="text-muted-foreground text-sm">{description}</p>
                  </div>
                </div>
              ))
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <HelpCircle className="text-primary size-5" />
              Preguntas Frecuentes
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {
              SUPPORT_FREQUENTLY_ASKED_QUESTIONS.map(({ question, answer }) => (
                <details className="group" key={question}>
                  <summary className="bg-muted/30 flex cursor-pointer items-center justify-between rounded-lg p-3">
                    <span className="font-medium">{question}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                  </summary>
                  <div className="details-content text-muted-foreground p-3 text-sm">{answer}</div>
                </details>
              ))
            }
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
