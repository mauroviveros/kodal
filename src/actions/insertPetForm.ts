import { createClient, createRoot } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { insertPetSchema } from "./schemas";

export default defineAction({
  accept: 'form',
  input: insertPetSchema,
  handler: async ({ medal_id, ...payload }, { request, cookies, params }) => {
    const supabase = createClient(request, cookies);
    const root = createRoot();

    // 1. Validar parámetro de URL medal_id con el del formulario
    if (!params.medal_id || params.medal_id !== medal_id) throw new Error("Medal ID mismatch");

    // 2. Verificar que la medalla exista y esté disponible (usa admin para leer cualquier estado)
    const { data: medal, error: medal_error } = await root
      .from('medals')
      .select('id, status')
      .eq('id', medal_id)
      .maybeSingle();
    if (medal_error || !medal) throw new Error("Medal not found");
    if (medal.status !== 'CREATED') throw new Error("Medal is not available for registration");

    // 3. Insertar la nueva mascota (UNIQUE constraint on medal_id prevents duplicates)
    const { data: pet, error: pet_error } = await root
      .from('pets')
      .insert({
        medal_id,
        ...payload
      })
      .select()
      .single();

    console.log('Insert result:', { pet, pet_error });

    if (pet_error || !pet) {
      console.error('Failed to Insert pet:', pet_error);
      throw new Error(`Failed to Insert pet: ${pet_error?.message || 'No data returned'}`);
    }
    // if (pet_error || !pet) throw new Error("Failed to create pet");

    // 4. Actualizar el estado de la medalla a ACTIVE (usa admin para garantizar éxito)
    const { error: update_medal_error } = await root
      .from('medals')
      .update({ status: 'ACTIVE' })
      .eq('id', medal_id);
    if (update_medal_error) {
      // Rollback: eliminar el pet si falla activar la medalla
      await root.from('pets').delete().eq('id', pet.id);
      throw new Error("Failed to activate medal");
    }

    return { pet };
  }
});
