
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
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

export function createRoot() {
  return createServerClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      cookies: {
        getAll() { return []; },
      }
    },
  );
}
