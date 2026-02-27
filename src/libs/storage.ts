import { root } from '@/supabase';

// Funcion para subir el avatar de la mascota a Supabase Storage
export const uploadPetAvatar = async ({ file, id }: { file?: File; id: string }) => {
  if (!file || !file.size) return null;

  const extension = file.name.split('.').pop() ?? 'png';
  const filePath = `${id}/avatar.${extension}`;

  const { error } = await root.storage.from('pet_avatars').upload(filePath, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    console.error('Failed to upload pet avatar:', error);
    throw new Error('Failed to upload pet avatar');
  }

  const { data } = root.storage.from('pet_avatars').getPublicUrl(filePath);

  return data.publicUrl;
};

// Funcion para eliminar el avatar de la mascota de Supabase Storage
export const removePetAvatar = async ({ path }: { path: string }) => {
  const { error } = await root.storage.from('pet_avatars').remove([path]);

  if (error) {
    console.error('Failed to remove pet avatar:', error);
    throw new Error('Failed to remove pet avatar');
  }
};
