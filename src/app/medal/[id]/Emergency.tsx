import { Card, CardContent } from "@/components/ui/card";
import { Tables } from "@/types";
import { ChevronRight, MessageCircle, Phone } from "lucide-react";

export const Emergency = ({ owner, petName }: { owner: Tables<'medal_owners'>; petName: string }) => {
  const message = encodeURIComponent(`Hola, encontré a ${petName}. Por favor, contáctame lo antes posible. Mensaje enviado desde la medalla inteligente Kodal.`);
  return (
    <Card className="shadow-lg border-red-200 border">
      <CardContent className="p-0">
        <a
          href={`tel:${owner.phone}`}
          className="flex items-center gap-4 p-5 bg-red-50 hover:bg-red-100 transition-colors group"
        >
          <span className="size-10 sm:size-14 bg-red-500 rounded-full flex items-center justify-center shrink-0">
            <Phone className="size-5 sm:size-7 text-white"/>
          </span>

          <div className="flex-1">
            <p className="font-bold text-red-700 text-lg">Encontraste a {petName}?</p>
            <p className="text-red-600 text-sm">Toca para llamar al duenio ahora</p>
          </div>

          <ChevronRight className="size-5 text-red-400 group-hover:translate-x-1 transition-transform" />
        </a>

        <section className="flex divide-x divide-red-200 border-t border-red-200">
          <a
            href={`https://wa.me/${owner.phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar WhatsApp
          </a>
        </section>
      </CardContent>
    </Card>
  )
}
