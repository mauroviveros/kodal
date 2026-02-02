import { supabase } from "@lib/supabase";
import type { Medal, MedalResponse, Slot, SlotPaginationResponse } from "@types";

export const getSlotsPaginated = async (page: number = 1, size: number = 10): Promise<SlotPaginationResponse> => {
  const offset = (page - 1) * size;

  let { data, error, count } = await supabase
    .from('medals_slot')
    .select('*', { count: 'exact' })
    .range(offset, offset + size - 1);

  if (!data) data = [];

  return {
    data,
    total: count || 0,
    size,
    start: offset + 1,
    end: offset + data.length,
    currentPage: page,
    lastPage: Math.ceil((count || 0) / size),
    error: error || undefined,
  }
}

export const getSlotDetails = async (slot_id: string): Promise<MedalResponse> => {
  let slot: Slot | null = null;
  let medal: Medal | null = null;

  try {
    const { data, error } = await supabase.from('medals_slot').select('*').eq('id', slot_id).maybeSingle();
    if (error) throw error;
    slot = data;

    if ( slot?.medal_id ) {
      const { data, error } = await supabase.from('medals').select('*').eq('id', slot.medal_id).maybeSingle();
      if (error) throw error;
      medal = data;
    }

    return { slot, medal };
  } catch(error){
    throw error;
  }
}
