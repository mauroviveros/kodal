import { createClient } from "@/supabase/client";
import type { APIRoute } from "astro";

export const GET = (async ({ request, cookies, url, redirect }) => {
  const code = url.searchParams.get("code");
  const redirectTo = url.searchParams.get("redirectTo");
  if (!code) return new Response("No code provided", { status: 400 });

  const supabase = createClient({ request, cookies });
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) return new Response(error.message, { status: 500 });
  const safeRedirect = redirectTo?.startsWith("/") ? redirectTo : "/";
  return redirect(safeRedirect);
}) satisfies APIRoute;
