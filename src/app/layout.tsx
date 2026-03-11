import type { Metadata } from "next";
import { Geist } from 'next/font/google';
import "./globals.css";
import Link from "next/link";
import { Brand } from "@/components/Brand";
import { HeaderActionsProvider, HeaderActionsSlot } from "@/components/HeaderActions";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodal",
  description: "Kodal es una plataforma innovadora dedicada a la seguridad y bienestar de las mascotas. Ofrecemos una comunidad de amantes de los animales para ayudar a mantener a tus mascotas seguras y conectadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geist.className}>
      <body className="bg-background text-foreground flex flex-col min-h-dvh">
        <HeaderActionsProvider>
          <Header/>

          {children}

          <Footer/>
        </HeaderActionsProvider>
      </body>
    </html>
  );
}


export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Brand/>

        <HeaderActionsSlot/>
      </div>
    </header>
  );
}
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
