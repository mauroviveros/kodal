import type { APIRoute } from "astro";
import { revalidateMedal } from "@/utils/revalidate";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const POST: APIRoute = async ({ request }) => {
  const secret = request.headers.get("x-webhook-secret");
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { table, record, old_record } = body;

  const row = record ?? old_record;
  const medal_id = table === "medals" ? row.id : row.medal_id;
  if (!medal_id) {
    return new Response("Missing medal_id", { status: 400 });
  }

  revalidateMedal(medal_id).catch(console.error);

  return new Response("OK", { status: 200 });
};
