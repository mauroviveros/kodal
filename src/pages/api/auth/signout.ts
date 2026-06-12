import { createClient } from "@/supabase/client";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = createClient({ request, cookies });
  const { error } = await supabase.auth.signOut();

  if (error) console.error("Sign out error:", error);
  return redirect("/signin");
};
