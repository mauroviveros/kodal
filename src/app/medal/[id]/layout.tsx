import { Footer, Header, HeaderActionsProvider, HeaderActionsSlot } from "@/components";

export default function MedalLayout({children}: { children: React.ReactNode }) {
  return (
    <HeaderActionsProvider>
      <Header>
        <HeaderActionsSlot/>
      </Header>
      <main className="container mx-auto px-4 pb-6 max-w-2xl space-y-6 grow pt-22">
        {children}
      </main>
      <Footer />
    </HeaderActionsProvider>
  );
}

