import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../interfaces";

export const supabase = createBrowserClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);
