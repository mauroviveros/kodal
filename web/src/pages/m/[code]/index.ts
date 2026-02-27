import { supabase } from "@/supabase";
import type { APIRoute } from "astro";

// esta peticion GET redirige de /m/:code a /medal/:id para mantener compatibilidad con enlaces antiguos
export const GET = (async ({ params, locals, redirect }) => {
  if(!params.code) return redirect("/404");
  const { data: medal } = await supabase.from("medals").select("id").eq("code", params.code).maybeSingle();
  if (!medal) return redirect("/404");
  return redirect(`/medal/${medal.id}`);
}) satisfies APIRoute;
