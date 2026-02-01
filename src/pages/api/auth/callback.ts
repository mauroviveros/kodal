import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get("code");

  if (!code) return new Response("No code provided", { status: 400 });

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return new Response(error.message, { status: 500 });
  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, { path: "/" });
  cookies.set("sb-refresh-token", refresh_token, { path: "/" });

  return redirect(url.searchParams.get("redirectTo") || "/");
};
