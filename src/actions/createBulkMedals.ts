import { createClient } from "@lib/supabase";
import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export default defineAction({
  accept: 'json',
  input: z.object({
    quantity: z.number().int().min(1).max(100),
  }),
  handler: async ({ quantity }, { request, cookies }) => {
    const supabase = createClient(request, cookies);

    // 1. Crear array de medallas vacías con timestamp
    const payload = Array.from({ length: quantity }, () => ({}));

    // 2. Insertar las medallas en la BD
    const { data: medals, error: insert_error } = await supabase
      .from("medals")
      .insert(payload)
      .select()

    if (insert_error || !medals) throw new Error(`Failed to insert medals: ${insert_error?.message || 'No data returned'}`);

    // 3. Retornar los datos de las medallas creadas
    return { medals };
  },
});
