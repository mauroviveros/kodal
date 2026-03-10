import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const CTA = () => (
  <Card className="shadow-lg">
    <CardContent className="p-6 text-center">
      <h3 className="text-xl font-bold text-foreground mb-3">Te gusta esta medalla inteligente?</h3>
      <p className="text-muted-foreground mb-6 text-pretty text-lg">Protege a tu mascota con nuestra tecnología de identificación digital. Fácil de usar, siempre actualizada y disponible 24/7.</p>


      <Link href="/#pricing" aria-disabled className="pointer-events-none">
        <Button size="lg" className="w-full md:w-auto" disabled>
          Consigue tu Medalla Inteligente
        </Button>
      </Link>
    </CardContent>
  </Card>
);