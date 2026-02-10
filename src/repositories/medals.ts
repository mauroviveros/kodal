import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Enums } from "@types";

// Función para actualizar una medalla
export const updateMedal = async (
  supabase: SupabaseClient<Database>,
  { id, payload }: { id: string; payload: Database['public']['Tables']['medals']['Update'] },
) => {
  const { id: _, ...updateData } = payload;
  const { data, error } = await supabase
    .from('medals')
    .update({
      ...updateData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to update medal:', error);
    throw new Error("Failed to update medal");
  }

  return data;
}

// Función para obtener una medalla por su ID
export const getMedalById = async (
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const { data, error } = await supabase
    .from('medals')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('Medal not found:', error);
    throw new Error("Medal not found");
  }

  return data;
}

// Función para validar que una medalla existe y está disponible para registro
export const validateMedalForRegistration = async (
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const data = await getMedalById(supabase, { id });
  const validStatuses: Enums<'MEDAL_STATUS'>[] = ['CREATED'];

  if (!data || !validStatuses.includes(data.status)) {
    console.error('Medal is not available for registration', { id, status: data?.status });
    throw new Error("Medal is not available for registration");
  }

}
