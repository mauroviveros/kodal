import { owner_exists, token_exists, token_insert } from "@/repositories";
import { ActionError, defineAction } from "astro:actions";
import z from "zod";

export default defineAction({
  accept: "form",
  input: z.object({
    medal_id: z.uuid(),
    email: z.email(),
  }),
  handler: async ({ medal_id, email }, { request: { redirect } }) => {
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
      // 4. Enviar email
      console.log(`Enviando email con código de verificación: ${token_code} para la medalla ${medal_id}`);
    } catch(error) {
      console.error("Failed to send verification code:", { error });
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al enviar el código de verificación. Por favor, inténtelo de nuevo más tarde.' });
    }

    return token_code;
  }
});
