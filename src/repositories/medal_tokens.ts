import { root } from "@/supabase"

export const validateHasToken = async (
  medal_id: string,
  token_code: string
) => {
  if (import.meta.env.DISABLE_TOKEN) return true;

  const query = root
    .from('medal_tokens')
    .select('id')
    .eq('medal_id', medal_id)
    .is('revoked_at', null)
    .gt('expires_at', new Date().toISOString());

  if (token_code) query.eq('code', token_code);

  const { data, error } = await query.maybeSingle();

  if(error) throw error;
  return !!data;
}

export const revokeToken = async (
  medal_id: string,
  code: string
) => {
  if (import.meta.env.DISABLE_TOKEN) return null;

  const { data, error } = await root
    .from('medal_tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('medal_id', medal_id)
    .eq('code', code)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  return data;
}
