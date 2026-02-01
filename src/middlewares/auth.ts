import { supabase } from "@lib/supabase";
import type { MiddlewareHandler } from "astro";

const routes = ["/admin"];

export const middleware: MiddlewareHandler = async (context, next) => {
  if(!routes.some(route => context.url.pathname.startsWith(route))) return next();

  const access_token = context.cookies.get('sb-access-token')?.value;
  const refresh_token = context.cookies.get('sb-refresh-token')?.value;

  try {
    if (!access_token || !refresh_token) throw new Error('No tokens found');

    const { data: { session, user }, error } = await supabase.auth.setSession({ refresh_token, access_token });
    if (error) throw error;

    context.locals.session = session;
    context.locals.user = user;
  } catch(error) {
    context.cookies.delete('sb-access-token', { path: '/' });
    context.cookies.delete('sb-refresh-token', { path: '/' });

    return context.redirect('/signin?redirectTo=' + encodeURIComponent(context.url.pathname));
  }

  return next();
}
