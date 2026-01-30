import { supabase } from "@lib/supabase";
import type { Medal, Slot } from "@types";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, request }) => {
  let slot_db: Slot = null;
  let medal_db: Medal = null;

  const formData = await request.formData();
  const entries = formData.entries().map(([key, val]) => [key, val || undefined]);
  const data = Object.fromEntries(entries);

  if (params.id) {
    const { data } = await supabase.from("medals_slot").select("*").eq("id", params.id).single();
    slot_db = data;
  }

  if (!slot_db) {
    return new Response(JSON.stringify({ error: "Slot no encontrado" }), { status: 404 });
  }

  const { data: medal_upserted } = await supabase.from("medals").upsert({ id: slot_db.medal_id || undefined, ...data}).select().single();
  medal_db = medal_upserted;

  if (!slot_db.medal_id && medal_db) {
    const { data: slot_updated } = await supabase.from("medals_slot").update({ medal_id: medal_db.id, used_at: new Date().toISOString() }).eq("id", slot_db.id).select().single()
    slot_db = slot_updated;
  }

  return new Response(JSON.stringify({ slot: slot_db, medal: medal_db }), { status: 200 });
}

export const GET: APIRoute = async ({ params }) => {
  let slot: Slot = null;
  let medal: Medal = null;

  try {
    if ( params.id ){
      const { data } = await supabase.from('medals_slot').select('*').eq('id', params.id || '').single();
      slot = data;
    }

    if ( slot?.medal_id ) {
      const { data } = await supabase.from('medals').select('*').eq('id', slot.medal_id).single();
      medal = data;
    }

    return new Response(JSON.stringify({slot, medal}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
