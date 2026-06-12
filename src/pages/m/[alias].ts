import { supabase } from '@/supabase/client';
import type { APIRoute } from 'astro';
export const config = {
  isr: { expiration: false },
};

export const GET: APIRoute = async ({ params, redirect }) => {
  const { alias } = params as { alias: string };

  const { data: aliasMatch } = await supabase
    .from('medals')
    .select('id')
    .eq('alias', alias)
    .maybeSingle();

  if (aliasMatch) return redirect(`/medal/${aliasMatch.id}`, 307);

  const { data: legacyMatch } = await supabase
    .from('medals')
    .select('id')
    .eq('legacy_code', alias)
    .maybeSingle();

  if (legacyMatch) return redirect(`/medal/${legacyMatch.id}`, 307);

  return redirect('/404');
};
