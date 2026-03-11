import { Footer, Header } from "@/components";

export default function LandingLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pb-6 max-w-2xl space-y-6 grow pt-22">
        {children}
      </main>
      <Footer />
    </>
  );
}

