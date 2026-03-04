import { insertOwner, insertPet, revokeToken, updateMedalStatus, updateOwner, updatePet, updatePetAvatar, validateHasToken, validateMedalIsAvailable } from "@repositories";
import { formSchema } from "@schemas";
import type { APIRoute } from "astro";

export const POST = (async ({ params, request }) => {
  try{
    const formData = await request.formData();
    const body = JSON.parse(formData.get('data')?.toString() || '{}');
    const {
      medal_id,
      avatar_file,
      pet: { id: _, ...pet },
      owner: { id: __, ...owner }
    } = await formSchema.parseAsync({
      ...body,
      avatar_file: formData.get('avatar_file') || undefined
    });

    // 1. Validar que los IDs de la medalla, mascota y dueño están presentes y son consistentes
    if (!params.id || params.id !== medal_id) throw new Error('Medal ID mismatch between URL and form data');

    // 2. Validar que la medalla existe y no está activa (para evitar crear mascotas y dueños asociados a medallas que ya están en uso)
    await validateMedalIsAvailable(medal_id);

    // 3. Insertar la información de la mascota y dueño en la base de datos
    const insertedPet = await insertPet({ medal_id, ...pet });
    const insertedOwner = await insertOwner({ medal_id, ...owner });

    // 4. Actualizar avatar de la mascota si se proporciona un nuevo archivo
    if (avatar_file) {
      const avatar_path = await updatePetAvatar({medal_id, pet_id: insertedPet.id}, avatar_file);
      insertedPet.avatar_path = avatar_path;
    }

    // 5. Actualizar la medalla para marcarla como activa
    await updateMedalStatus(medal_id, 'ACTIVE');


    return new Response(
      JSON.stringify({ pet: insertedPet, owner: insertedOwner }),
      { headers: { 'Content-Type': 'application/json' }}
    );
  } catch (error) {
    if (error instanceof Error) error = { message: error.message };
    return new Response(
      JSON.stringify({error}),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}) satisfies APIRoute;

export const PUT = (async ({ params, request, }) => {
  try{
    const formData = await request.formData();
    const body = JSON.parse(formData.get('data')?.toString() || '{}');
    const {
      medal_id,
      token_code,
      avatar_file,
      pet: { id: pet_id, ...pet },
      owner: { id: owner_id, ...owner }
    } = await formSchema.parseAsync({
      ...body,
      avatar_file: formData.get('avatar_file') || undefined
    });

    // 1. Validar que los IDs de la medalla, mascota y dueño están presentes y son consistentes
    if (!params.id || params.id !== medal_id) throw new Error('Medal ID mismatch between URL and form data');
    if (!pet_id) throw new Error('Pet ID is required for update');
    if (!owner_id) throw new Error('Owner ID is required for update');
    if (!(import.meta.env.DISABLE_TOKEN)){
      if (!token_code) {
        console.log('Token code is required but not provided');
        throw new Error('Token code is required for authentication');
      }
    }

    // 2. Validar el token de autenticación
    if (!import.meta.env.DISABLE_TOKEN && token_code) {
      const hasToken = await validateHasToken(medal_id, token_code);
      if (!hasToken) throw new Error('Invalid or expired token');
    }

    // 3. Actualizar la información de la mascota en la base de datos
    const updatedPet = await updatePet(medal_id, { id: pet_id, ...pet });
    const updatedOwner = await updateOwner(medal_id, { id: owner_id, ...owner });

    // 4. Actualizar avatar de la mascota si se proporciona un nuevo archivo
    if (avatar_file) {
      const avatar_path = await updatePetAvatar({medal_id, pet_id}, avatar_file);
      updatedPet.avatar_path = avatar_path;
    }

    // 5. Invalidar el token después de su uso
    if (!import.meta.env.DISABLE_TOKEN && token_code){
      await revokeToken(medal_id, token_code);
    }

    return new Response(
      JSON.stringify({ pet: updatedPet, owner: updatedOwner }),
      { headers: { 'Content-Type': 'application/json' }}
    );
  } catch (error) {
    if (error instanceof Error) error = { message: error.message };
    return new Response(
      JSON.stringify({error}),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}) satisfies APIRoute;
