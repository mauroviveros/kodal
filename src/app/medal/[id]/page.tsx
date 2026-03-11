import { Hero } from "./Hero";
import { Emergency } from "./Emergency";
import { CTA } from "./CTA";
import { createClient } from "@/supabase";
import { HeaderActions } from "@/components/HeaderActions";
import { VerificationIdentityDialog } from "@/components/dialogs/VerificationIdentityDialog";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MedalDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createClient();

  const { data: medal } = await supabase.from("medals")
    .select("*, pet:medal_pets(*), owner:medal_owners(*)")
    .eq("id", id)
    .maybeSingle()

  // TODO: mejorar el manejo de errores
  if (!medal || !medal.pet || !medal.owner) {
    return <div>Medal not found</div>;
  }

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
