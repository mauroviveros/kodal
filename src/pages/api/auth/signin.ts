import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ url, redirect, locals: { supabase }, request: { formData } }) => {
  const form = await formData();
  const provider = form.get("provider")?.toString();
  const redirectTo = form.get("redirectTo")?.toString();
  const redirectToURL = new URL('/api/auth/callback', url.origin);

  if (provider !== "github") return new Response("Unsupported provider", { status: 400 });
  if (redirectTo) redirectToURL.searchParams.set("redirectTo", redirectTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectToURL.toString(),
    },
  });

  if (error) return redirect(`/signin?error=${encodeURIComponent(error.message)}`);
  return redirect(data.url);
}
