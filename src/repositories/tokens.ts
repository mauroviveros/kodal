import type { Tables } from "@/interfaces";
import { root } from "@/supabase";

type token_params = Pick<Tables<'tokens'>, 'medal_id' | 'code'>;
type token_insert_params = { medal_id: Tables<'tokens'>['medal_id'] } & Partial<Tables<'tokens'>>;

export const token_revoke = async ({ medal_id, code }: token_params) => {
  const { error } = await root
    .from('tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('medal_id', medal_id)
    .eq('code', code);
  if (error) throw error;
}

export const token_validate = async (
  { medal_id, code }: token_params
) => {
  const { data, error } = await root
    .from('tokens')
    .select('id')
    .eq('code', code)
    .eq('medal_id', medal_id)
    .gt('expires_at', new Date().toISOString())
    .is('revoked_at', null)
    .maybeSingle();

  if(error){
    console.error("Error validating token:", { error, medal_id, code });
    return false;
  }

  return !!data;
}

export const token_exists = async (
  { medal_id }: Pick<Tables<'tokens'>, 'medal_id'>
) => {
  const { data, error } = await root
    .from('tokens')
    .select('id')
    .eq('medal_id', medal_id)
    .gt('expires_at', new Date().toISOString())
    .is('revoked_at', null)
    .limit(1)
    .maybeSingle();

  if(error){
    console.error("Error checking active token existence:", { error });
    return false;
  }

  return !!data;
}

export const token_insert = async (
  {
    medal_id,
    expires_at = new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutos por defecto
    code = crypto.randomUUID(),
  }: token_insert_params
) => {
  const { data, error } = await root
    .from('tokens')
    .insert({
      medal_id,
      code,
      expires_at
    })
    .select('code')
    .single();

  if (error) throw error;
  return data.code
}
