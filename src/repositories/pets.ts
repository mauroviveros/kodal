import type { Tables } from "@/interfaces";
import { supabase } from "@/supabase";

export const pet_update = async (
  { medal_id, name, breed, species, gender, birth_date, notes }:
  { medal_id: Tables<"pets">["medal_id"]} & Partial<Tables<"pets">>
) => {
  const { error } = await supabase
    .from('pets')
    .update({
      name,
      breed,
      species,
      gender,
      birth_date,
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq('medal_id', medal_id);
  if (error) throw error;
}
