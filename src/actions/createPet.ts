import { ActionError, defineAction } from "astro:actions";
import { formDataToObject } from "@/utils";
import { MedalSchema, type MedalInput } from "@/schemas";
import { medal_active, owner_create, pet_create, pet_update_avatar } from "@/repositories";

export default defineAction({
  accept: "form",
  handler: async (input) => {
    const object = formDataToObject<MedalInput>(input);
    const parsed = MedalSchema.safeParse(object);

    if(parsed.error){
      console.error("Validation error:", { errors: parsed.error, input, object, parsed });
      throw new ActionError({ code: 'BAD_REQUEST', message: 'Los datos proporcionados no son válidos' });
    }

    const { pet, owner, medal_id, avatar_file } = parsed.data;

    try{
      // 1. Activo la medalla y actualizo los datos de la mascota y dueño
      await medal_active({ medal_id });
      await pet_create({ medal_id, ...pet });
      await owner_create({ medal_id, ...owner });
    } catch(error) {
      console.error("Failed to update pet or owner:", { error, medal_id, pet, owner });
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al actualizar los datos de la medalla' });
    }

    // 2. Si se proporcionó un nuevo avatar, subirlo y actualizar la ruta en la base de datos
    if(avatar_file) {
      try{
        await pet_update_avatar({ medal_id, avatar_file });
      } catch(error) {
        console.error("Failed to update pet avatar:", { error, medal_id, avatar_file });
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al actualizar el avatar de la mascota' });
      }
    }

    return medal_id;
  }
})
