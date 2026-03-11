import type { Metadata } from "next";
import { Geist } from 'next/font/google';
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodal",
  description: "Kodal es una plataforma innovadora dedicada a la seguridad y bienestar de las mascotas. Ofrecemos una comunidad de amantes de los animales para ayudar a mantener a tus mascotas seguras y conectadas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={geist.className}>
      <body className="bg-background text-foreground flex flex-col min-h-dvh">
        {children}
      </body>
    </html>
  );
}
