import { sendVerificationEmail } from "@libs";
import { getToken, insertToken } from "@repositories";
import { sendTokenEmailSchema } from "@schemas";
import { ActionError, defineAction } from "astro:actions";

export const sendTokenEmailForm = defineAction({
  accept: 'form',
  input: sendTokenEmailSchema,
  handler: async ({ medal_id }, { url, locals }) => {
    let resend_email_id: string | null = null;
    const { medal, pet } = locals;
    if (import.meta.env.DISABLE_TOKEN) return { success: true };

    // 1. Validar que existan ambos registros de medalla y mascota
    if (!medal || !medal.email || !pet) {
      console.error('Medal or pet not found for medal_id:', medal_id);
      throw new ActionError({
        code: 'NOT_FOUND',
        message: 'Medalla o mascota no encontrada para el ID proporcionado',
      });
    }

    // 2. Validar que el pet no tenga un token activo (que no esté revocado y no haya expirado)
    const token = await getToken({ pet_id: pet.id });
    if (token) {
      console.error('Active token already exists for pet_id:', pet.id);
      throw new ActionError({
        code: 'CONFLICT',
        message: 'Ya existe un token activo para esta mascota. Por favor, revoca el token actual antes de solicitar uno nuevo.',
      });
    }

    // 3. Guardar el token en la base (para validar luego) y enviar un email al usuario con el token (usando Resend)
    try{
      const { code } = await insertToken({ pet_id: pet.id });
      const { id } = await sendVerificationEmail({
        email: medal.email,
        code: code,
        pet_name: pet.name,
        medal_id,
        origin: url.origin,
      });
      resend_email_id = id;
    } catch (error) {
      console.error('Error sending token email:', error);
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Error al enviar el email con el token',
      });
    }

    return { success: true, resend_email_id };
  }
})
