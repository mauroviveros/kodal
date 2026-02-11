import { createClient } from '@supabase';
import type { MiddlewareHandler } from 'astro';

// Este middleware se encarga de crear un cliente de Supabase para cada solicitud,
export const middleware: MiddlewareHandler = async ({ request, cookies, locals }, next) => {
  const supabase = createClient(request, cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  locals.user = user;
  locals.session = session;
  locals.supabase = supabase;

  return next();
};
