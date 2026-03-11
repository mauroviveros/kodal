import { createClient } from "@/supabase";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{
    code: string;
  }>;
}
export default async function Page({ params }: Props) {
  const { code } = await params;
  const supabase = createClient();
  const { data: medal } = await supabase.from("medals")
    .select("id")
    .eq("code", code)
    .maybeSingle()

  if (!medal) return notFound();
  return redirect(`/medal/${medal.id}`);
}