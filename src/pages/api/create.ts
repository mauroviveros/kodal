import type { APIRoute } from "astro";
import { v4 as uuid } from 'uuid';
import sha256 from 'crypto-js/hmac-sha256';
// import { db, Pet } from "astro:db";

export const POST: APIRoute = async () => {
  try {
    const id = sha256(uuid() + new Date().toISOString(), 'miclavesecreta').toString();
    // await db.insert(Pet).values({ id });

    return new Response(
      JSON.stringify({ id, message: 'OK' }),
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
