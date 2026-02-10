import { sendVerificationEmail } from "@libs";
import { checkPetWithoutActiveToken, insertToken } from "@repositories";
import { sendTokenEmailSchema } from "@schemas";
import { root } from "@supabase";
import { defineAction } from "astro:actions";

export default defineAction({
  accept: 'form',
  input: sendTokenEmailSchema,
  handler: async ({ medal_id, pet_id, pet_name, email }, { url }) => {
    if (import.meta.env.DISABLE_TOKEN) return { success: true };

    // 2. Validar que el pet no tenga un token activo (que no esté revocado y no haya expirado)
    await checkPetWithoutActiveToken(root, { pet_id });
    // 3. Guardar el token en la base (para validar luego)
    const { code } = await insertToken(root, { pet_id });

    // 4. Enviar un email al usuario con el token (usando Resend)
    const { id } = await sendVerificationEmail({
      email,
      code,
      pet_name,
      medal_id,
      origin: url.origin,
    });

    return { success: true, resend_email_id: id };
  }
})
