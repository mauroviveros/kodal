import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@types';

export const uploadPetAvatar = async (supabase: SupabaseClient<Database>, { file, id }: { file?: File; id: string }) => {
  if (!file || !file.size) return null;

  const extension = file.name.split('.').pop() ?? 'png';
  const filePath = `${id}/avatar.${extension}`;

  const { error } = await supabase.storage.from('pet_avatars').upload(filePath, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    console.error('Failed to upload pet avatar:', error);
    throw new Error('Failed to upload pet avatar');
  }

  const { data } = supabase.storage.from('pet_avatars').getPublicUrl(filePath);

  return data.publicUrl;
};

export const removePetAvatar = async (supabase: SupabaseClient<Database>, { path }: { path: string }) => {
  const { error } = await supabase.storage.from('pet_avatars').remove([path]);

  if (error) {
    console.error('Failed to remove pet avatar:', error);
    throw new Error('Failed to remove pet avatar');
  }
};
