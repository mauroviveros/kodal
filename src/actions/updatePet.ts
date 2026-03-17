import { ActionError, defineAction } from "astro:actions";
import { MedalFormEditSchema } from "@/schemas";
import { owner_update, pet_update, token_revoke, token_validate } from "@/repositories";

export default defineAction({
  accept: "json",
  input: MedalFormEditSchema,
  handler: async ({ medal_id, token_code, pet, owner }) => {
    // 1. Validar el token de acceso y asegurarse de que el usuario tenga permiso para actualizar la mascota
    const isTokenValid = await token_validate({ medal_id, token_code });
    if (!isTokenValid) throw new ActionError({ code: 'UNAUTHORIZED', message: 'Token invalido o expirado' });

    try{
      // 2. Actualizo la información de la mascota y el dueño en la base de datos
      await pet_update({ medal_id, ...pet });
      await owner_update({ medal_id, ...owner });
    } catch(error) {
      console.error("Failed to update pet or owner:", { error, medal_id, pet, owner });
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al actualizar los datos de la medalla' });
    }

    try{
      // 3. Revocar el token de acceso para evitar que se vuelva a usar;
      await token_revoke({ medal_id, token_code });
    } catch(error) {
      console.error("Failed to revoke token:", { error, medal_id, token_code });
    }

    return medal_id;
  }
});
