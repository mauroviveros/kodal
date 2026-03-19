import type { Tables } from "@/interfaces";
import { root } from "@/supabase";

export const medal_active = async (
  { medal_id }: { medal_id: Tables<"medals">["id"] }
) => {
  const { error } = await root
    .from('medals')
    .update({
      status: 'ACTIVE',
      updated_at: new Date().toISOString(),
    })
    .eq('id', medal_id);

  if (error) throw error;
}
