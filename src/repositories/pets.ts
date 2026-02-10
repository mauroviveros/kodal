import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@types"

export const updatePet = async (
  supabase: SupabaseClient<Database>,
  { id, medal_id, payload }: { id: string; medal_id: string; payload: Database['public']['Tables']['pets']['Update'] }
) => {
  const {id: _, medal_id: __, ...updateData} = payload;
  const { data, error } = await supabase
    .from('pets')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('medal_id', medal_id)
    .select('*')
    .single();

  if (error){
    console.error('Failed to update pet:', error);
    throw new Error("Failed to update pet");
  }

  return data;
}

// Función para insertar una nueva mascota
export const insertPet = async (
  supabase: SupabaseClient<Database>,
  { payload }: { payload: Database['public']['Tables']['pets']['Insert'] }
) => {
  const { data, error } = await supabase
    .from('pets')
    .insert({
      ...payload,
      created_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) {
    console.error('Failed to insert pet:', error);
    throw new Error("Failed to insert pet");
  }

  return data;
}

export const deletePet = async (
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Failed to delete pet:', error);
    throw new Error("Failed to delete pet");
  }
}

// Función para obtener una mascota por su ID
export const getPetByMedalId = async (
  supabase: SupabaseClient<Database>,
  { medal_id }: { medal_id: string }
) => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('medal_id', medal_id)
    .maybeSingle();

  if (error) {
    console.error('Pet not found:', error);
    throw new Error("Pet not found");
  }

  return data;
}
