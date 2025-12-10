import type { APIRoute } from "astro";
import { generateUUID } from "@utils";
import { db, Slot } from "astro:db";

export const POST: APIRoute = async () => {
  try {
    const result = await db
      .insert(Slot)
      .values({
        id: generateUUID(),
        created_at: new Date(),
      })
      .returning();

    return new Response(
      JSON.stringify({ id: result[0].id, message: 'OK' }),
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
