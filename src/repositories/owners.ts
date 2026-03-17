import type { Tables } from "@/interfaces";
import { supabase } from "@/supabase";

export const owner_update = async (
  { medal_id, relation_type, full_name, email, phone, address }:
  { medal_id: Tables<"pets">["medal_id"]} & Partial<Tables<"owners">>
) => {
  const { error } = await supabase
    .from('owners')
    .update({
      relation_type,
      full_name,
      email,
      phone,
      address,
      updated_at: new Date().toISOString(),
    })
    .eq('medal_id', medal_id);
  if (error) throw error;
}
