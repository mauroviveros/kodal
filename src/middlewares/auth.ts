import type { MiddlewareHandler } from "astro";
import { minimatch } from "minimatch";

const routes = {
  privates: ["/admin/**", "/api/admin/**"],
  prerender: ["/"],
}

const isProtected = (pathname: string) => routes.privates.some(pattern => minimatch(pathname, pattern));
const isAPI = (pathname: string) => minimatch(pathname, "/api/**");
const shouldSkipAuth = (pathname: string) => routes.prerender.some(pattern => minimatch(pathname, pattern));

export const middleware: MiddlewareHandler = async ({ locals, url, redirect }, next) => {
  if(shouldSkipAuth(url.pathname)) return next();

  if(isProtected(url.pathname) && !locals.session){
    if(isAPI(url.pathname)) return new Response("Unauthorized", { status: 401 });
    return redirect(`/signin?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  return next();
}
