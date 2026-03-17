import { MedalFormCreateSchema } from "@/schemas";
import { ActionError, defineAction } from "astro:actions";

export default defineAction({
  accept: "json",
  input: MedalFormCreateSchema,
  handler: async ({ medal_id, pet, owner }) => {
    throw new ActionError({ code: 'NOT_IMPLEMENTED', message: 'Esta acción aún no ha sido implementada' });
  }
})
