type Props = {
  children: React.ReactNode;
}
export default function MedalLayout({children}: Props) {
  return (
    <main className="container mx-auto px-4 pb-6 max-w-2xl space-y-6 grow pt-22">
      {children}
    </main>
  );
}

