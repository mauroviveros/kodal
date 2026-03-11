import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { FEATURES_LIST } from "@/constants";
import { ShoppingCart, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <main className="grow">
      <section className="from-secondary/5 to-primary/15 bg-linear-to-br pt-16 h-dvh">
        <div className="container mx-auto max-w-4xl h-full flex flex-col items-center justify-center p-4 text-center animate-zoom-in animate-duration-slower">
          <span className="bg-primary/10 text-primary border-primary/20 flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap">
            <Smartphone className="mr-1 size-3" />
            Tecnología Inteligente para Mascotas
          </span>

          <h1 className="my-6 text-4xl font-bold text-balance lg:text-6xl">
            Mantén a tu mascota <br />
            <span className="text-primary">segura y conectada</span>
            {' '} siempre.
          </h1>

          <p className="text-muted-foreground mb-8 max-w-xl text-xl text-pretty">
            Medallas inteligentes con tecnología digital que permiten a cualquier persona contactarte inmediatamente si encuentran a tu mascota perdida.
          </p>

          <Button size="lg" disabled>
            Consigue tu Medalla
            <ShoppingCart />
          </Button>
        </div>
      </section>

      <section className="bg-muted/30 text-muted-foreground py-20">
        <div className="container mx-auto px-4">
          <header className="mb-16 text-center mx-auto max-w-2xl animate-fade-in-down timeline-view animate-range-entry">
            <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl text-balance">¿Por qué elegir Kodal?</h2>
            <p className="text-muted-foreground text-xl text-pretty">Tecnología avanzada diseñada específicamente para la seguridad de tu mascota</p>
          </header>

          <article className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {
              FEATURES_LIST.map(({ title, description, Icon }) => (
                <Card className="timeline-view animate-zoom-in animate-range-entry" key={title}>
                  <CardHeader className="text-center">
                    <span className="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                      <Icon className="text-primary size-6" />
                    </span>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              ))
            }
          </article>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Listo para proteger a tu mascota?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a miles de dueños que ya confían en Kodal para mantener a sus mascotas seguras
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" disabled>
              Consigue tu Medalla Ahora
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
