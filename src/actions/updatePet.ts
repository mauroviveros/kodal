import { ActionError, defineAction } from "astro:actions";
import { MedalEditSchema, type MedalEditInput } from "@/schemas";
import { owner_update, pet_update, pet_update_avatar, token_revoke, token_validate } from "@/repositories";
import { formDataToObject } from "@/utils";


export default defineAction({
  accept: "form",
  handler: async (input) => {
    const object = formDataToObject<MedalEditInput>(input);
    const parsed = MedalEditSchema.safeParse(object);

    if(parsed.error){
      console.error("Validation error:", { errors: parsed.error, input, object, parsed });
      throw new ActionError({ code: 'BAD_REQUEST', message: 'Los datos proporcionados no son válidos' });
    }
    const { pet, owner, medal_id, token_code, avatar_file } = parsed.data;

    // 1. Validar el token de acceso y asegurarse de que el usuario tenga permiso para actualizar la mascota
    const isTokenValid = await token_validate({ medal_id, code: token_code });
    if (!isTokenValid) throw new ActionError({ code: 'UNAUTHORIZED', message: 'Token invalido o expirado' });

    try{
      // 2. Actualizo la información de la mascota y el dueño en la base de datos
      await pet_update({ medal_id, ...pet });
      await owner_update({ medal_id, ...owner });
    } catch(error) {
      console.error("Failed to update pet or owner:", { error, medal_id, pet, owner });
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al actualizar los datos de la medalla' });
    }

    // 3. Si se proporcionó un nuevo avatar, subirlo y actualizar la ruta en la base de datos
    if(avatar_file) {
      try{
        await pet_update_avatar({ medal_id, avatar_file });
      } catch(error) {
        console.error("Failed to update pet avatar:", { error, medal_id, avatar_file });
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al actualizar el avatar de la mascota' });
      }
    }

    try{
      // 4. Revocar el token de acceso para evitar que se vuelva a usar;
      await token_revoke({ medal_id, code: token_code });
    } catch(error) {
      console.error("Failed to revoke token:", { error, medal_id, token_code });
    }

    return medal_id;
  }
});
