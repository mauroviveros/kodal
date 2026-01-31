import type { Database } from "@lib/database";
import type { PostgrestError } from "@supabase/supabase-js";

export type Slot = Database['public']['Tables']['medals_slot']['Row'];
export type Medal = Database['public']['Tables']['medals']['Row'];

export interface MedalResponse {
  slot: Slot | null;
  medal: Medal | null;
}

export interface SlotPaginationResponse {
  data: Slot[];
  total: number;
  size: number;
  start: number;
  end: number;
  currentPage: number;
  lastPage: number;
  error?: PostgrestError
}
