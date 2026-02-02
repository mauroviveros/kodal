
import { createBrowserClient, createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { Database } from "./database";
import type { AstroCookies } from "astro";

export function createClient(request: Request, cookies: AstroCookies) {
  return createServerClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        flowType: "pkce",
      },
      cookies: {
        getAll(){
          return parseCookieHeader(request.headers.get('Cookie') ?? '') as { name: string; value: string }[];
        },
        setAll(cookiesToSet){
          cookiesToSet.forEach(({ name, value, options }) =>{
            cookies.set(name, value, {
            ...options,
            maxAge: 60 * 60 * 24 * 7, // 1 week
          })
          });
        }
      }
    }
  );
}
export const _supabase = createBrowserClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      flowType: "pkce",
    },
  }
);
