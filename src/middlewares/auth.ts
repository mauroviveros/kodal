import { createClient } from "@lib/supabase";
import type { MiddlewareHandler } from "astro";
import { minimatch } from "minimatch";

const routes = {
  privates: ["/admin/**", "/api/admin/**"],
  prerender: ["/"],
}

const isProtected = (pathname: string) => {
  return routes.privates.some(pattern => minimatch(pathname, pattern));
}

const isAPI = (pathname: string) => {
  return minimatch(pathname, "/api/**");
}

const shouldSkipAuth = (pathname: string) => {
  return routes.prerender.some(pattern => minimatch(pathname, pattern));
}

export const middleware: MiddlewareHandler = async ({ request, cookies, locals, url, redirect }, next) => {
  if(shouldSkipAuth(url.pathname)) return next();

  const supabase = createClient(request, cookies);
  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  locals.user = user;
  locals.session = session;
  locals.supabase = supabase;

  if(isProtected(url.pathname) && !session){
    if(isAPI(url.pathname)) return new Response("Unauthorized", { status: 401 });
    return redirect(`/signin?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  return next();
}
