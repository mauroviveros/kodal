import { defineMiddleware } from "astro:middleware";
import { supabase } from "./supabase";

export const onRequest = defineMiddleware(async ({ url, params: { medal_id }, locals, redirect }, next) => {
  if (!url.pathname.startsWith("/medal")) return next();
  if (!medal_id) return redirect("/404");

  const { data } = await supabase
  .from("medals")
  .select("*, pet:pets(*)")
  .eq("id", medal_id)
  .maybeSingle();
  if (!data) return redirect("/404");

  const { pet, ...medal } = data;
  locals.medal = medal;
  locals.pet = pet;

  return next();
});
