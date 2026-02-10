import type { MiddlewareHandler } from "astro";
import { minimatch } from "minimatch";

const routes = {
  privates: ["/admin/**", "/api/admin/**"],
}

const isProtected = (pathname: string) => routes.privates.some(pattern => minimatch(pathname, pattern));
const isAPI = (pathname: string) => minimatch(pathname, "/api/**");

// Este middleware se encarga de verificar si el usuario tiene una sesión válida para acceder a rutas protegidas
export const middleware: MiddlewareHandler = async ({ locals, url, redirect }, next) => {
  if(isProtected(url.pathname) && !locals.session){
    if(isAPI(url.pathname)) return new Response("Unauthorized", { status: 401 });
    return redirect(`/signin?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  return next();
}
