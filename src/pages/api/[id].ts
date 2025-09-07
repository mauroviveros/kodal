import type { APIRoute } from "astro";
import { db, eq, Pet } from "astro:db";
import { z } from "astro:schema";

export const PUT: APIRoute = async ({ request, params }) => {
  try {
    if (!params.id) return new Response(); // falta id
    const pet = await db.select().from(Pet).where(eq(Pet.id, params.id)).get();
    if (!pet) return new Response(); // no existe la mascota

    const schema = z.object({
      name: z.string().optional(),
      species: z.enum(['dog', 'cat', 'other']).optional(),
      breed: z.string().optional(),
      birthdate: z.date().optional(),
      weight: z.number().min(0).optional(),
    });

    const data = await request.formData();
    const parsed = schema.parse(Object.fromEntries(data.entries()));
    const result = await db.update(Pet)
      .set(parsed)
      .where(eq(Pet.id, params.id))
      .returning();

    return new Response(
      JSON.stringify({ data: result, message: 'OK' }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ ...error as Error }),
      { status: 500 }
    );
  }
}
