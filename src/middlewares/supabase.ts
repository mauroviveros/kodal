import { createClient } from "@lib/supabase";
import type { MiddlewareHandler } from "astro";

export const middleware: MiddlewareHandler = async ({ request, cookies, locals, url }, next) => {
  const supabase = createClient(request, cookies);
  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  locals.user = user;
  locals.session = session;
  locals.supabase = supabase;

  return next();
}
