import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { POLICY_OF_PRIVACY } from '@/constants'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 pb-6 max-w-4xl space-y-6 grow pt-22">
      <header className="mb-8 text-center">
        <Shield className="text-primary mx-auto mb-4 size-16"/>
        <h1 className="mb-2 text-3xl font-bold">Política de Privacidad</h1>
        <p className="text-muted-foreground">Última actualización: Febrero 2026</p>
      </header>

      <section className="space-y-6">
        {
          POLICY_OF_PRIVACY.map(({ title, content, items }, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{index + 1}. {title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: content }} />
                {items && (
                  <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))
        }
      </section>
    </main>
  )
}
