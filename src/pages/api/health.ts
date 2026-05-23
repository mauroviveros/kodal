import { root } from "@/supabase/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const { count } = await root
      .from("medals")
      .select("*", { count: "exact", head: true });

    return new Response(
      JSON.stringify({ status: "ok", medals: count }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Database query failed" }),
      { status: 500 }
    );
  }
};
