import { root } from "@/supabase";
import { uploadPetAvatar } from "@libs";
import type { Tables, TablesInsert, TablesUpdate } from "@types";

export const insertPet = async (
  { medal_id, species, gender, name, breed, birth_date, notes }: TablesInsert<'medal_pets'>
) => {
  const { data, error } = await root
    .from('medal_pets')
    .insert({
      medal_id,

      name,
      species,
      gender,
      breed,
      birth_date,
      notes,

      status: 'ACTIVE',
      created_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export const updatePet = async (
  medal_id: string,
  { id, species, gender, name, breed, birth_date, notes }: TablesUpdate<'medal_pets'>
) => {
  if (!id) throw new Error("Pet ID is required for update");

  const { data, error } = await root
    .from('medal_pets')
    .update({
      name,
      species,
      gender,
      breed,
      birth_date,
      notes,

      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('medal_id', medal_id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export const updatePetAvatar = async (
  {medal_id, pet_id}: {medal_id: string, pet_id: number},
  avatar_file: File
) => {
  const avatar_path = await uploadPetAvatar(medal_id, avatar_file);

  const { error } = await root
    .from('medal_pets')
    .update({ avatar_path })
    .eq('medal_id', medal_id)
    .eq('id', pet_id)

  if (error) throw error;
  return avatar_path;
}
