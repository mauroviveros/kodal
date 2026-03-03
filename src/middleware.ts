import { defineMiddleware } from "astro:middleware";
import { supabase } from "./supabase";
import { getPetAvatarUrl } from "@libs";

export const onRequest = defineMiddleware(async ({ url, params: { id }, locals, redirect }, next) => {
  if (!url.pathname.startsWith("/medal")) return next();
  if (!id) return redirect("/404");

  const query =  supabase
  .from("medals")
  .select("*, pet:medal_pets(*), owner:medal_owners(*)")

  if(id) query.eq("id", id);

  const { data } = await query.maybeSingle()
  if (!data) return redirect("/404");

  const { pet, owner, ...medal } = data;
  locals.medal = medal;
  locals.pet = pet;
  locals.owner = owner;
  if(pet?.avatar_path){
    locals.avatar_url = await getPetAvatarUrl(pet.avatar_path);
  }

  return next();
});
