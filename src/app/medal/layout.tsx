type Props = {
  children: React.ReactNode;
}
export default function MedalLayout({children}: Props) {
  return (
    <main className="container mx-auto p-4 pb-8 max-w-2xl space-y-6">
      {children}
    </main>
  );
}

