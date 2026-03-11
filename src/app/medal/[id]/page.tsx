import { notFound, redirect } from "next/navigation";
import { supabase } from "@/supabase";
import { HeaderActions } from "@/components";
import { CtaCard, EmergencyCard, HeroCard, VerificationIdentityDialog } from "./_components";


export default async function MedalPage({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;

  const { data: medal } = await supabase.from("medals")
    .select("*, pet:medal_pets(*), owner:medal_owners(*)")
    .eq("id", id)
    .maybeSingle()

  if(!medal) return notFound();
  if(!medal.pet || !medal.owner) return redirect(`/medal/${id}/create`);

  return (
    <>
      <HeroCard pet={medal.pet} />
      <EmergencyCard owner={medal.owner} petName={medal.pet.name} />
      <CtaCard />

      <HeaderActions>
        <VerificationIdentityDialog medal_id={medal.id} pet={medal.pet} />
      </HeaderActions>
    </>
  );
}
