import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@types";

export const revokeToken = async (
  supabase: SupabaseClient<Database>,
  { code, pet_id }: { code: string; pet_id: string; }
) => {
  if (import.meta.env.DISABLE_TOKEN) return null;

  const { data, error } = await supabase
    .from('pet_tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('code', code)
    .eq('pet_id', pet_id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to revoke token:', error);
    throw new Error("Failed to revoke token");
  }

  return data;
}

export const getToken = async (
  supabase: SupabaseClient<Database>,
  { code, pet_id }: { code: string; pet_id: string; }
) => {
  if (import.meta.env.DISABLE_TOKEN) return null;

  const { data, error } = await supabase
    .from('pet_tokens')
    .select('pet_id')
    .eq('code', code)
    .eq('pet_id', pet_id)
    .is('revoked_at', null)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error) {
    console.error('Invalid token:', error);
    throw new Error("Invalid token");
  }

  return data;
}
