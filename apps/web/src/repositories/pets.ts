import { root } from "@/supabase";
import type { Database } from "@types";

// Función para insertar una nueva mascota
export const insertPet = async (
  { payload }: { payload: Database['public']['Tables']['pets']['Insert'] },
) => {
  const { data, error } = await root
    .from('pets')
    .insert({
      ...payload,
      created_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) {
    console.error('Failed to insert pet:', error);
    throw new Error('Failed to insert pet');
  }

  return data;
};

// Función para actualizar una mascota
export const updatePet = async (
  { id, medal_id, payload }: { id: string; medal_id: string; payload: Database['public']['Tables']['pets']['Update'] },
) => {
  const { id: _, medal_id: __, ...updateData } = payload;
  const { data, error } = await root
    .from('pets')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('medal_id', medal_id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to update pet:', error);
    throw new Error('Failed to update pet');
  }

  return data;
};

// Función para actualizar una mascota
export const deletePet = async ({ id }: { id: string }) => {
  const { error } = await root.from('pets').delete().eq('id', id);

  if (error) {
    console.error('Failed to delete pet:', error);
    throw new Error('Failed to delete pet');
  }
};
