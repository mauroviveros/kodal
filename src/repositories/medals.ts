import { root } from "@/supabase";
import type { Enums } from "@types";


export const updateMedalStatus = async (
  medal_id: string,
  status: Enums<'MEDAL_STATUS'>
) => {
  const { data, error } = await root
    .from('medals')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', medal_id)
    .select('id, status')
    .single();

  if (error) throw error;

  return data;
}

// 2. Validar que la medalla existe y no está activa (para evitar crear mascotas y dueños asociados a medallas que ya están en uso)
export const validateMedalIsAvailable = async (medal_id: string) => {
  const { data, error } = await root
    .from('medals')
    .select('id, status')
    .eq('id', medal_id)
    .single();

  if (error) throw error;

  if (!data) throw new Error('Medal not found');
  if (['MANUFACTURED'].includes(data.status)) throw new Error('Medal is not available');

  return !!data;
}
