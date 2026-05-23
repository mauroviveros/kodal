import { supabase } from "@/supabase/client";

const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN;
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export async function revalidateMedal(medalId: string) {
  if (!BYPASS_TOKEN || !BASE_URL) return;

  const paths = [`/medal/${medalId}/`];

  try {
    const { data } = await supabase
      .from("medals")
      .select("alias, legacy_code")
      .eq("id", medalId)
      .single();

    if (data?.alias) paths.push(`/m/${data.alias}`);
    if (data?.legacy_code) paths.push(`/m/${data.legacy_code}`);
  } catch (error) {
    console.error("Failed to fetch alias for revalidation:", error);
  }

  await Promise.all(
    paths.map((path) =>
      fetch(`${BASE_URL}${path}`, {
        method: "HEAD",
        headers: { "x-prerender-revalidate": BYPASS_TOKEN },
      }).catch((err) => console.error(`Revalidation failed for ${path}:`, err))
    )
  );
}
