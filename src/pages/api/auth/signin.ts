import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, url }) => {
  const formData = await request.formData();
  const provider = formData.get("provider")?.toString();

  if (provider !== "github") return new Response("Unsupported provider", { status: 400 });

  const redirectTo = new URL(request.url);
  redirectTo.pathname = '/api/auth/callback';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo.toString(),
    },
  });

  if (error) return new Response(error.message, { status: 500 });
  return redirect(data.url);
}
