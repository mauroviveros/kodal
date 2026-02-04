import { createClient } from "@lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const quantity = parseInt(formData.get("quantity")?.toString() || "0");
  const supabase = createClient(request, cookies);

  if (quantity <= 0 || quantity > 100) return new Response(
    JSON.stringify({ error: "Quantity must be between 1 and 100" }),
    { status: 400 }
  );

  try {
    const slots = Array.from({ length: quantity }, () => ({
      created_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase.from("medals").insert(slots).select();
    if (error) throw error;

    return new Response(JSON.stringify(
      { success: true, data }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
