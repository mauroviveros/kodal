import { createClient } from "@supabase/supabase-js";
import type { Database } from "../interfaces";

export const root = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SECRET_SUPABASE_KEY,
);
