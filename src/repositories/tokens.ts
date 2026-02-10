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
    .select('*')
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

export const checkPetWithoutActiveToken = async (
  supabase: SupabaseClient<Database>,
  { pet_id }: { pet_id: string; }
) => {
  if (import.meta.env.DISABLE_TOKEN) return true;

  const { data, error } = await supabase
    .from('pet_tokens')
    .select('code, pet_id')
    .eq('pet_id', pet_id)
    .is('revoked_at', null)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('Error validating token:', error);
    throw new Error("Error validating token");
  }

  if (data) {
    console.error('A valid token already exists for this pet', data);
    throw new Error("A valid token already exists for this pet");
  }

  return true;
}

export const insertToken = async (
  supabase: SupabaseClient<Database>,
  { pet_id}: { pet_id: string; }
) => {
  if (import.meta.env.DISABLE_TOKEN) throw new Error("Token generation is disabled");

  const { data, error } = await supabase
    .from('pet_tokens')
    .insert({
      pet_id,
      code: crypto.randomUUID(),
      expires_at: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 min
      created_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) {
    console.error('Failed to insert token:', error);
    throw new Error("Failed to insert token");
  }

  return data;
}
