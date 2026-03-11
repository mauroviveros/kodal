import { notFound } from "next/navigation";
import { supabase } from "@/supabase";
// import { MedalFormInsert } from "@/components/form/FormMedal";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MedalEditPage({ params }: Props) {
  const { id } = await params;
  const { data: medal } = await supabase.from("medals")
    .select(`
      id,
      pet:medal_pets(*),
      owner:medal_owners(*)
    `)
    .eq("id", id)
    .maybeSingle()

  if(!medal) return notFound();

  return (
    <>
      <hgroup className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Editar información de {medal.pet?.name}</h1>
        <p className="text-muted-foreground">Completa los datos de tu mascota para crear su perfil.</p>
      </hgroup>

      {/* <MedalFormInsert /> */}
    </>
  )
}
