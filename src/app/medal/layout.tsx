type Props = {
  children: React.ReactNode;
}
export default function MedalLayout({children}: Props) {
  return (
    <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6 grow">
      {children}
    </main>
  );
}

