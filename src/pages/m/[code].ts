import { supabase } from '@/supabase';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, redirect }) => {
  const { code } = params;
  if(!code) return redirect('/404');
  const { data } = await supabase.from('medals').select('id').eq('code', code).single();
  if(!data) return redirect('/404');
  return redirect(`/medal/${data.id}`, 307)
};
