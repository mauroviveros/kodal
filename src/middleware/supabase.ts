import { createClient } from '@supabase';
import type { MiddlewareHandler } from 'astro';

// Este middleware se encarga de crear un cliente de Supabase para cada solicitud,
export const middleware: MiddlewareHandler = async ({ request, cookies, locals, isPrerendered }, next) => {
  if (isPrerendered) return next(); // Si la página se está prerenderizando, saltamos este middleware para evitar errores
  locals.supabase = createClient(request, cookies);
  return next();
};
