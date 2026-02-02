
import type { Medal, Slot } from "@types";
import type { APIRoute } from "astro";
import { schema } from "schemas";

export const POST: APIRoute = async ({ params, request, redirect, locals }) => {
  let slot_db: Slot | null = null;
  let medal_db: Medal | null = null;
  try {
    const data = schema.parse(Object.fromEntries((await request.formData())));

    if (params.id) {
      const { data, error } = await locals.supabase.from("medals_slot").select("*").eq("id", params.id).maybeSingle();
      if (error) throw error;
      slot_db = data;
    }

    if (!slot_db) throw new Error("Slot undefined");

    const { data: medal_upserted, error } = await locals.supabase.from("medals").upsert({ id: slot_db.medal_id || undefined, ...data}).select().single();
    if (error) throw error;
    medal_db = medal_upserted;

    if (!slot_db.medal_id && medal_db) {
      const { data: slot_updated, error } = await locals.supabase.from("medals_slot").update({ medal_id: medal_db.id, used_at: new Date().toISOString() }).eq("id", slot_db.id).select().single();
      if (error) throw error;
      if( slot_updated ) slot_db = slot_updated;
    }

    return redirect(`/medal/${slot_db.id}`);
  } catch(error){
    if(error instanceof Error) error = { message: error.message };
    return new Response(JSON.stringify({ slot: slot_db, medal: medal_db, error }), { status: 500, headers: { "Content-Type": "application/json" } } );
  }
}
