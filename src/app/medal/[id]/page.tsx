import { Hero } from "./Hero";
import { Emergency } from "./Emergency";
import { CTA } from "./CTA";
import { supabase } from "@/supabase";
import { HeaderActions } from "@/components/HeaderActions";
import { VerificationIdentityDialog } from "@/components/dialogs/VerificationIdentityDialog";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MedalPage({ params }: Props) {
  const { id } = await params;

  const { data: medal } = await supabase.from("medals")
    .select("*, pet:medal_pets(*), owner:medal_owners(*)")
    .eq("id", id)
    .maybeSingle()

  if(!medal) return notFound();
  if(!medal.pet || !medal.owner) return redirect(`/medal/${id}/create`);

  return (
    <>
      <Hero pet={medal.pet} />
      <Emergency owner={medal.owner} petName={medal.pet.name} />
      <CTA/>

      <HeaderActions>
        <VerificationIdentityDialog medal_id={medal.id} pet={medal.pet} />
      </HeaderActions>
    </>
  );
}
