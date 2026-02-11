import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ url, redirect, locals: { supabase }, request }) => {
  const formData = await request.formData();
  const provider = formData.get('provider')?.toString();
  const redirectTo = formData.get('redirectTo')?.toString();
  const redirectToURL = new URL('/api/auth/callback', url.origin);

  if (provider !== 'github') return new Response('Unsupported provider', { status: 400 });
  if (redirectTo) redirectToURL.searchParams.set('redirectTo', redirectTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectToURL.toString(),
    },
  });

  if (error) return redirect(`/admin/signin?error=${encodeURIComponent(error.message)}`);
  return redirect(data.url);
};
