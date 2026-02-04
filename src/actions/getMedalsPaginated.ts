import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { createClient, createRoot } from "@lib/supabase";

export default defineAction({
  input: z.object({
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(10),
  }),
  handler: async ({ page, pageSize }, { request, cookies, params }) => {
    const supabase = createClient(request, cookies);

    // 1. Calcular el offset para la paginación (página 1 = offset 0)
    const offset = (page - 1) * pageSize;

    // 2. Obtener el conteo total de medallas (para calcular el total de páginas)
    const { count, error: count_error } = await supabase
      .from('medals')
      .select('*', { count: 'exact', head: true });
    if (count_error) throw new Error(`Failed to count medals: ${count_error.message}`);

    const total = count || 0;

    // 3. Obtener las medallas paginadas con sus mascotas asociadas
    const { data: medals, error: medals_error } = await supabase
      .from('medals')
      .select('*, pets(*)')
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (medals_error) throw new Error(`Failed to fetch medals: ${medals_error.message}`);

    // 4. Calcular metadatos de paginación
    const lastPage = Math.max(1, Math.ceil(total / pageSize));
    const start = total > 0 ? offset + 1 : 0;
    const end = Math.min(offset + pageSize, total);

    // 5. Retornar datos con metadatos de paginación
    return {
      data: medals || [],
      pagination: {
        total,
        size: pageSize,
        start,
        end,
        currentPage: page,
        lastPage,
      }
    };
  }
})
