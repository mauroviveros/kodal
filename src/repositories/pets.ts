import type { Tables, TablesInsert, TablesUpdate } from "@/interfaces";
import { root, supabase } from "@/supabase";

export const pet_update = async (
  { medal_id, name, breed, species, gender, birth_date, notes }:
  { medal_id: Tables<"pets">["medal_id"]} & TablesUpdate<"pets">
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

export const pet_create = async (
  { medal_id, name, breed, species, gender, birth_date, notes }:
  { medal_id: Tables<"pets">["medal_id"]} & TablesInsert<"pets">
) => {
  const { error } = await root
    .from('pets')
    .insert({
      name,
      breed,
      species,
      gender,
      birth_date,
      notes,
      created_at: new Date().toISOString(),
      medal_id,
    })
  if (error) throw error;
}
