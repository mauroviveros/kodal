import { ActionError, defineAction } from "astro:actions";
import { formDataToObject } from "@/utils";
import { MedalSchema, type MedalInput } from "@/schemas";

export default defineAction({
  accept: "form",
  handler: async (input) => {
    const object = formDataToObject<MedalInput>(input);
    const parsed = MedalSchema.safeParse(object);

    if(parsed.error){
      console.error("Validation error:", { errors: parsed.error, input, object, parsed });
      throw new ActionError({ code: 'BAD_REQUEST', message: 'Los datos proporcionados no son válidos' });
    }

    const { pet, owner, medal_id } = parsed.data;

    try{
      // 1. Activo la medalla y actualizo los datos de la mascota y dueño
      // await medal_active({ medal_id });
      // await pet_create({ medal_id, ...pet });
      // await owner_create({ medal_id, ...owner });
    } catch(error) {
      console.error("Failed to update pet or owner:", { error, medal_id, pet, owner });
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al actualizar los datos de la medalla' });
    }

    return medal_id;
  }
})
