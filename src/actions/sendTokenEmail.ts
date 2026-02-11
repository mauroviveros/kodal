import { sendVerificationEmail } from '@libs';
import { checkPetWithoutActiveToken, getMedalById, getPetByMedalId, insertToken } from '@repositories';
import { sendTokenEmailSchema } from '@schemas';
import { root } from '@supabase';
import { defineAction } from 'astro:actions';

export default defineAction({
  accept: 'form',
  input: sendTokenEmailSchema,
  handler: async ({ medal_id }, { url }) => {
    if (import.meta.env.DISABLE_TOKEN) return { success: true };

    // 1. Obtener datos de medalla y mascota asociada al medal_id
    const medal = await getMedalById(root, { id: medal_id });
    const pet = await getPetByMedalId(root, { medal_id });

    // 2. Validar que existan ambos registros
    if (!medal || !medal.email || !pet) {
      console.error('Medal or pet not found for medal_id:', medal_id);
      throw new Error('Medal or pet not found');
    }

    // 3. Validar que el pet no tenga un token activo (que no esté revocado y no haya expirado)
    await checkPetWithoutActiveToken(root, { pet_id: pet.id });

    // 4. Guardar el token en la base (para validar luego)
    const { code } = await insertToken(root, { pet_id: pet.id });

    // 5. Enviar un email al usuario con el token (usando Resend)
    const { id } = await sendVerificationEmail({
      email: medal.email,
      code,
      pet_name: pet.name,
      medal_id,
      origin: url.origin,
    });

    return { success: true, resend_email_id: id };
  },
});
