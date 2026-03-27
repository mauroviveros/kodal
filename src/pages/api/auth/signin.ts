import { createClient } from "@/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import type { APIRoute } from "astro";

export const POST = (async ({ request, cookies, url, redirect }) => {
  const VALID_PROVIDERS: Provider[] = ["github"];
  const formData = await request.formData();

  const provider = formData.get("provider") as Provider;
  const redirectTo = formData.get("redirectTo") as string | null;

  if(!VALID_PROVIDERS.includes(provider)) return new Response("Invalid provider", { status: 400 });

  const redirectToURL = new URL('/api/auth/callback', url.origin);
  if(redirectTo) redirectToURL.searchParams.set("redirectTo", redirectTo);

  const supabase = createClient({ request, cookies });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectToURL.toString(),
    }
  });

  if (error) return redirect(`${url.pathname}?error=${encodeURIComponent(error.message)}`);
  return redirect(data.url);
}) satisfies APIRoute;
