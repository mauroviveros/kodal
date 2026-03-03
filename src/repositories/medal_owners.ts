import { root } from "@/supabase";
import type { Tables, TablesInsert, TablesUpdate } from "@/types/database";

export const insertOwner = async (
  { medal_id, relation_type, full_name, email, phone, address }: TablesInsert<'medal_owners'>
) => {
  const { data, error } = await root
    .from('medal_owners')
    .insert({
      medal_id,

      relation_type,
      full_name,
      email,
      phone,
      address,

      created_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export const updateOwner = async (
  medal_id: string,
  { id, relation_type, full_name, email, phone, address }: TablesUpdate<'medal_owners'>
) => {
  if (!id) throw new Error("Owner ID is required for update");

  const { data, error } = await root
    .from('medal_owners')
    .update({
      relation_type,
      full_name,
      email,
      phone,
      address,

      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('medal_id', medal_id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
