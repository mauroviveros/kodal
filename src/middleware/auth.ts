import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

const routes = {
  privates: ['/admin/**', '/api/admin/**'],
};

const isProtected = (pathname: string) => {
  if (pathname === '/admin/signin') return false;
  return routes.privates.some((pattern) => minimatch(pathname, pattern));
};
const isAPI = (pathname: string) => minimatch(pathname, '/api/**');

// Este middleware se encarga de verificar si el usuario tiene una sesión válida para acceder a rutas protegidas
export const middleware: MiddlewareHandler = async ({ locals: { supabase, session }, url, redirect }, next) => {
  console.time('Auth Middleware');
  if (isProtected(url.pathname)) {
    const { data } = await supabase.auth.getSession();
    session = data.session;
    if (!session) {
      if (isAPI(url.pathname)) return new Response('Unauthorized', { status: 401 });
      return redirect(`/admin/signin?redirectTo=${encodeURIComponent(url.pathname)}`);
    }
  }
  console.timeEnd('Auth Middleware');
  return next();
};
