interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string
  readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY: string
  readonly SUPABASE_SECRET_KEY: string
  readonly RESEND_API_KEY: string
  readonly RESEND_FROM_EMAIL: string

  readonly DISABLE_TOKEN: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    session?: import("@supabase/supabase-js").Session | null;
    user: import("@supabase/supabase-js").User | null;
    supabase: import("@supabase/supabase-js").SupabaseClient<import("@lib/database").Database>;
  }
}
