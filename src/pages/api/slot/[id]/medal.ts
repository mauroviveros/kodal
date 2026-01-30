import { supabase } from "@lib/supabase";
import type { Medal, Slot } from "@types";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  let slot_db: Slot = null;
  let medal_db: Medal = null;

  const formData = await request.formData();
  const entries = formData.entries().map(([key, val]) => [key, val || undefined]);
  const data = Object.fromEntries(entries);

  try {
    if (params.id) {
      const { data, error } = await supabase.from("medals_slot").select("*").eq("id", params.id).maybeSingle();
      if (error) throw error;
      slot_db = data;
    }

    if (!slot_db) throw new Error("Slot undefined");

    const { data: medal_upserted, error } = await supabase.from("medals").upsert({ id: slot_db.medal_id || undefined, ...data}).select().single();
    if (error) throw error;
    medal_db = medal_upserted;

    if (!slot_db.medal_id && medal_db) {
      const { data: slot_updated, error } = await supabase.from("medals_slot").update({ medal_id: medal_db.id, used_at: new Date().toISOString() }).eq("id", slot_db.id).select().single();
      if (error) throw error;
      if( slot_updated ) slot_db = slot_updated;
    }

    return redirect(`/medal/${slot_db.id}`);
  } catch(error){
    if(error instanceof Error) error = { message: error.message };
    return new Response(JSON.stringify({ slot: slot_db, medal: medal_db, error }), { status: 500, headers: { "Content-Type": "application/json" } } );
  }
}

export const GET: APIRoute = async ({ params }) => {
  let slot: Slot = null;
  let medal: Medal = null;

  if (!params.id) return new Response(JSON.stringify({ slot, medal }), { status: 200 });

  try{
    const { data, error } = await supabase.from('medals_slot').select('*').eq('id', params.id).maybeSingle();
    if (error) throw error;
    slot = data;

    if ( slot?.medal_id ) {
      const { data, error } = await supabase.from('medals').select('*').eq('id', slot.medal_id).maybeSingle();
      if (error) throw error;
      medal = data;
    }

    return new Response(JSON.stringify({slot, medal}), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch(error){
    return new Response(JSON.stringify({slot, medal, error}), { status: 500, headers: { "Content-Type": "application/json" } });
  }


}
