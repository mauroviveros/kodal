import { defineMiddleware } from "astro:middleware";
import { supabase } from "./supabase";

export const onRequest = defineMiddleware(async ({ url, params: { code, id }, locals, redirect }, next) => {
  if (!url.pathname.startsWith("/m")) return next();
  if (!(code || id)) return redirect("/404");

  const query =  supabase
  .from("medals")
  .select("*, pet:pets(*)")

  if(code) query.eq("code", code);
  if(id) query.eq("id", id);

  const { data } = await query.maybeSingle()
  if (!data) return redirect("/404");

  const { pet, ...medal } = data;
  locals.medal = medal;
  locals.pet = pet;

  return next();
});
