import { supabase } from "@lib/supabase";
import type { Slot } from "@types";
import type { APIRoute } from "astro";

interface SlotPaginationResponse {
  data: Slot[];
  total: number;
  size: number;
  start: number;
  end: number;
  currentPage: number;
  lastPage: number;
}

export const GET: APIRoute = async ({ params }) => {
  const page = parseInt(params.page || "1", 10) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;


  // get total number of results
  const { data, error, count } = await supabase.from('medals_slot').select('*', { count: 'exact', head: true });

  console.log()

  // const response: SlotPaginationResponse = {
  //   data: [],
  // }

  return new Response(JSON.stringify({ data, error, count }), { status: 200, headers: { "Content-Type": "application/json" } });
}
