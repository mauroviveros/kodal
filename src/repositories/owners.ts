import type { Tables, TablesInsert } from "@/interfaces";
import { supabase } from "@/supabase/client";
import { root } from "@/supabase/server";

export const owner_update = async (
  { medal_id, relation_type, full_name, email, phone, address }:
  { medal_id: Tables<"owners">["medal_id"]} & Partial<Tables<"owners">>
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

export const owner_create = async (
  { medal_id, relation_type, full_name, email, phone, address }:
  { medal_id: Tables<"owners">["medal_id"]} & TablesInsert<"owners">
) => {
  const { error } = await root
    .from('owners')
    .insert({
      relation_type,
      full_name,
      email,
      phone,
      address,
      created_at: new Date().toISOString(),
      medal_id,
    })
  if (error) throw error;
}

export const owner_exists = async (
  { email, medal_id }:
  Pick<Tables<"owners">, 'email' | 'medal_id'>
) => {
  const { data, error } = await supabase
    .from('owners')
    .select('email')
    .eq('email', email)
    .eq('medal_id', medal_id)
    .maybeSingle();

  if(error){
    console.error("Error checking if owner exists:", { error, email, medal_id });
    return false;
  }

  return !!data;
}
