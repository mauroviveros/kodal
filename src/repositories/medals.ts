import type { Tables } from "@/interfaces";
import { supabase } from "@/supabase/client";
import { root } from "@/supabase/server";

export const medal_active = async (
  { medal_id }: { medal_id: Tables<"medals">["id"] }
) => {
  const { error } = await root
    .from('medals')
    .update({
      status: 'ACTIVE',
      updated_at: new Date().toISOString(),
    })
    .eq('id', medal_id);

  if (error) throw error;
}

export const medal_details = async (
  { medal_id }: { medal_id: Tables<"medals">["id"] }
) => {
  const { data, error } = await supabase
  .from("medals")
  .select(`
    id,
    pet:pets(name, breed, birth_date, avatar_path, gender, species, notes),
    owner:owners(phone, email, full_name, relation_type)
  `)
  .eq("id", medal_id)
  .single();

  if(error) throw error;
  return data;
}
