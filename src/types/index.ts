import type { Database } from "@lib/database";

export type Slot = Database['public']['Tables']['medals_slot']['Row'] | null;
export type Medal = Database['public']['Tables']['medals']['Row'] | null;

export interface Response {
  slot: Slot;
  medal: Medal;
}
