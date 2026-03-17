import type { Tables } from "@/interfaces";
import { root } from "@/supabase";

type token_params = {
  medal_id: Tables<'medals'>['id'];
  token_code: Tables<'tokens'>['code'];
}

export const token_revoke = async (
  { medal_id, token_code }: token_params
) => {
  const { error } = await root
    .from('tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('medal_id', medal_id)
    .eq('code', token_code);
  if (error) throw error;
}

export const token_validate = async (
  { medal_id, token_code }: token_params
) => {
  const { data, error } = await root
    .from('tokens')
    .select('id')
    .eq('medal_id', medal_id)
    .eq('code', token_code)
    .is('revoked_at', null)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();
  if(error) return false;
  return !!data;
}
