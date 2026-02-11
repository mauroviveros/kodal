import type { APIRoute } from 'astro';

export const safeURL = (url: string) => (url.startsWith('/') && !url.startsWith('//') ? url : '/');
export const GET: APIRoute = async ({ url, redirect, locals: { supabase } }) => {
  const code = url.searchParams.get('code');
  if (!code) return new Response('No code provided', { status: 400 });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return new Response(error.message, { status: 500 });

  const redirectTo = url.searchParams.get('redirectTo');
  const safeRedirect = safeURL(redirectTo || '/');

  return redirect(safeRedirect);
};
