import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./interfaces";

export const root = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SECRET_SUPABASE_KEY,
);

export const supabase = createBrowserClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);
