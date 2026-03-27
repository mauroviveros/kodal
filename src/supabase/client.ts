import { createBrowserClient, createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { Database } from "../interfaces";
import type { AstroCookies } from "astro";

export const supabase = createBrowserClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);

export function createClient({ request, cookies }: { request: Request; cookies: AstroCookies }) {
  return createServerClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "")
            .filter((cookie): cookie is { name: string; value: string } => typeof cookie.value === "string");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, {
              ...options,
              maxAge: 60 * 60 * 24 * 1, // 1 day
            });
          });
        },
      },
    }
  );
}
