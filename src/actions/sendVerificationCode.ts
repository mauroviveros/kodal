import { sendVerificationCodeEmail } from "@/libs";
import { owner_exists, token_exists, token_insert } from "@/repositories";
import { ActionError, defineAction } from "astro:actions";
import z from "zod";

export default defineAction({
  accept: "form",
  input: z.object({
    medal_id: z.uuid(),
    pet_name: z.string(),
    email: z.email(),
  }),
  handler: async ({ medal_id, pet_name, email }, { url }) => {
    let token_code;
    // 1. Validar que el email proporcionado exista y esté asociado a la medalla correspondiente
    const isOwnerExists = await owner_exists({ email, medal_id });
    if(!isOwnerExists) throw new ActionError({ code: 'NOT_FOUND', message: 'No se encontró un dueño con ese email para esta medalla' });

    // 2. Validar que no exista un token activo para esa medalla
    const isTokenExists = await token_exists({ medal_id });
    if(isTokenExists) throw new ActionError({ code: 'CONFLICT', message: 'Ya existe un token activo para esta medalla. Por favor, inténtelo de nuevo más tarde.' });

    try{
      // 3. Generar un nuevo token de acceso y asociarlo a la medalla
      token_code = await token_insert({ medal_id });
      console.log(`Token de verificación generado: ${token_code} para la medalla ${medal_id}`);

      // 4. Enviar email con el código de verificación utilizando Resend
      if (import.meta.env.PROD){
        const resend_id = await sendVerificationCodeEmail({ medal_id, owner_email: email, pet_name, token_code, origin: url.origin });
        console.log(`Email enviado con Resend. ID de Resend: ${resend_id}`);
      }
    } catch(error) {
      console.error("Failed to send verification code:", { error });
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al enviar el código de verificación. Por favor, inténtelo de nuevo más tarde.' });
    }

    return token_code;
  }
});
