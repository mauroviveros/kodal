import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database";

export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_KEY,
  {
    auth: {
      flowType: "pkce",
    },
  },
);
