import Link from "next/link";

export const Footer = () => {
  const LINKS = [
    { href: '/privacy', text: 'Políticas de Privacidad' },
    { href: '/terms', text: 'Términos de Servicio' },
    { href: '/support', text: 'Soporte' },
    { href: '/admin', text: 'Administración' }
  ]
  return (
    <footer className="border-t border-border bg-muted/30 text-muted-foreground">
      <div className="container mx-auto px-4 py-6 text-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {LINKS.map(({href, text}) => (
            <li key={href}>
                <Link href={href} className="hover:underline hover:text-primary/80">{text}</Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs">© 2026 Kodal. Manteniendo a las mascotas seguras y conectadas.</p>

        <p className="mt-2 text-xs">
          Diseñado y construido con ❤️ por
          <Link
            href="https://mauroviveros.com.ar/"
            className="text-primary hover:text-primary/80 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '} Mauro Daniel Viveros
          </Link>
        </p>
      </div>
    </footer>
  );
}