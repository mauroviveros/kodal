
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@types";

export const supabase = createBrowserClient<Database>(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_PUBLISHABLE_KEY);
export const root = createBrowserClient<Database>(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_SECRET_KEY);
