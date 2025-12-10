import type { APIRoute } from "astro";
import { generateUUID } from "@utils";
import { db, Token } from "astro:db";

export const POST: APIRoute = async ({ params }) => {
  try {
    if (!params.id) throw new Error("Medal ID is required");

    const token = await db
      .insert(Token)
      .values({
        id: generateUUID(),
        medal_id: params.id,
        expires_at: new Date(Date.now() + 1000 * 60 * 5),
        created_at: new Date(),
      })
      .returning();


    return new Response(JSON.stringify({ token: token[0].id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ...error as Error }), { status: 500 });
  }
}
