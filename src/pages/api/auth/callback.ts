import { createClient } from "@lib/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, url, cookies, redirect }) => {
  const code = url.searchParams.get("code");
  if (!code) return new Response("No code provided", { status: 400 });

  const supabase = createClient(request, cookies);
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return new Response(error.message, { status: 500 });

  console.log(url.searchParams.get("redirectTo"));

  return redirect(url.searchParams.get("redirectTo") || "/");
};
