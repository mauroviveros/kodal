import type { Tables, TablesInsert, TablesUpdate } from "@/interfaces";
import { supabase } from "@/supabase/client";
import { root } from "@/supabase/server";

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


export const pet_update_avatar = async (
  { medal_id, avatar_file }:
  { medal_id: Tables<"pets">["medal_id"], avatar_file: File }
) => {
  const extension = avatar_file.name.split('.').pop();
  const file_path = `${medal_id}/avatar` + (extension ? `.${extension}` : '');

  const { error: storage_error } = await root
    .storage
    .from('medals')
    .upload(file_path, avatar_file, {
      upsert: true,
      contentType: avatar_file.type,
      cacheControl: '3600',
    })
  if (storage_error) throw storage_error;

  const { error: update_error } = await supabase
    .from('pets')
    .update({
      avatar_path: file_path,
      updated_at: new Date().toISOString(),
    })
    .eq('medal_id', medal_id);
  if (update_error) throw update_error;
}
