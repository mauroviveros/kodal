import { supabase } from "@lib/supabase";
import type { SlotPaginationResponse } from "@types";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const page = parseInt(params.page || "1", 10) || 1;
  const size = 1;
  const offset = (page - 1) * size;

  let { data, error, count } = await supabase
    .from('medals_slot')
    .select('*', { count: 'exact' })
    .range(offset, offset + size - 1);

  if (!data) data = [];

  const response: SlotPaginationResponse = {
    data,
    total: count || 0,
    size,
    start: offset + 1,
    end: offset + data.length,
    currentPage: page,
    lastPage: Math.ceil((count || 0) / size),
    error: error || undefined,
  }

  return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } });
}
