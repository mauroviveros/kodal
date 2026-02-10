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
export const isValidMedalForRegistration = async (
  supabase: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const data = await getMedalById(supabase, { id });
  const validStatuses: Enums<'MEDAL_STATUS'>[] = ['CREATED'];

  if (!data || !validStatuses.includes(data.status)) {
    console.error('Medal is not available for registration', { id, status: data?.status });
    throw new Error("Medal is not available for registration");
  }

  return true;
}

export const insertNewMedals = async (
  supabase: SupabaseClient<Database>,
  { quantity }: { quantity: number }
) => {
  const payload = Array.from({ length: quantity }, () => ({
    status: 'CREATED' as Enums<'MEDAL_STATUS'>,
    created_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from('medals')
    .insert(payload)
    .select('id');

  if (error) {
    console.error('Failed to insert medals:', error);
    throw new Error("Failed to insert medals");
  }

  return data;
}

export async function getMedalsPaginated(
  supabase: SupabaseClient<Database>,
  { page, pageSize }: { page: number; pageSize: number }
) {
  const offset = (page - 1) * pageSize;

  const { data, error } = await supabase
    .from('medals')
    .select('*, pets(*)')
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.error('Failed to fetch medals:', error);
    throw new Error("Failed to fetch medals");
  }

  return data || [];
}

export const getTotalMedalsCount = async (
  supabase: SupabaseClient<Database>
) => {
  const { count, error } = await supabase
    .from('medals')
    .select('id', { count: 'exact', head: true });

  if (error) {
    console.error('Failed to count medals:', error);
    throw new Error("Failed to count medals");
  }

  return count || 0;
}
