import { root } from "@/supabase";
import type { Database } from "@types";

// Función para actualizar una medalla
export const updateMedal = async (
  { id, payload }: { id: string; payload: Database['public']['Tables']['medals']['Update'] }
) => {
  const { id: _, ...updateData } = payload;
  const { data, error } = await root
    .from('medals')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to update medal:', error);
    throw new Error('Failed to update medal');
  }

  return data;
}
