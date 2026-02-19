import { supabase } from "@/supabase";
import type { APIRoute } from "astro";

// Legacy code, esta pagina redirige de /medal/:id a /m/:code para mantener compatibilidad con enlaces antiguos
export const GET = (async ({ params, redirect }) => {
  if(!params.id) return redirect("/404");
  const { data, error } = await supabase.from("medals").select("code").eq("id", params.id).maybeSingle();
  if (error || !data || !data.code) return redirect("/404");

  return redirect(`/m/${data.code}`);
}) satisfies APIRoute;
