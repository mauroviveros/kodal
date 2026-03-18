import { supabase } from '@/supabase';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, redirect }) => {
  const { alias } = params as { alias: string };
  const { data } = await supabase
    .from('medals')
    .select('id')
    .or(`alias.eq.${alias},legacy_code.eq.${alias}`)
    .single();

  if(!data) return redirect('/404');
  return redirect(`/medal/${data.id}`, 307)
};
