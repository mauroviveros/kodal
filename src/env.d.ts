interface ImportMeta {
  readonly env: {
    readonly PUBLIC_SUPABASE_URL: string
    readonly PUBLIC_SUPABASE_KEY: string
    readonly SECRET_SUPABASE_KEY: string
    readonly RESEND_API_KEY: string
  }
}

declare namespace App {
  interface Locals {
    user: import("@supabase/supabase-js").User | null
  }
}
