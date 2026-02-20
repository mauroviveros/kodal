interface ImportMeta {
  readonly env: {
    readonly SUPABASE_URL: string;
    readonly SUPABASE_PUBLISHABLE_KEY: string;
    readonly SUPABASE_SECRET_KEY: string;
    readonly DISABLE_TOKEN?: boolean;
  };
}

declare namespace App {
  interface Locals {
    medal: import('@types').Database['public']['Tables']['medals']['Row'];
    pet: import('@types').Database['public']['Tables']['pets']['Row'] | null;
  }
}
