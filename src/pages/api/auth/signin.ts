import { createClient } from "@lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const formData = await request.formData();
  const provider = formData.get("provider")?.toString();
  const redirectTo = formData.get("redirectTo")?.toString();
  const redirectToURL = new URL('/api/auth/callback', url.origin)
  if (redirectTo) redirectToURL.searchParams.set('redirectTo', redirectTo);
  if (provider !== "github") return new Response("Unsupported provider", { status: 400 });

  const supabase = createClient(request, cookies);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: new URL('/api/auth/callback', url.origin).toString(),
    },
  });

  if (error) return redirect(`/signin?error=${encodeURIComponent(error.message)}`);
  return redirect(data.url);
}
