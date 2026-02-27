import { defineMiddleware } from "astro:middleware";
import { supabase } from "./supabase";

export const onRequest = defineMiddleware(async ({ url, params: { id }, locals, redirect }, next) => {
  if (!url.pathname.startsWith("/medal")) return next();
  if (!id) return redirect("/404");

  const query =  supabase
  .from("medals")
  .select("*, pet:pets(*)")

  if(id) query.eq("id", id);

  const { data } = await query.maybeSingle()
  if (!data) return redirect("/404");

  const { pet, ...medal } = data;
  locals.medal = medal;
  locals.pet = pet;

  return next();
});
