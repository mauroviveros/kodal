import { getMedalsPaginated, getTotalMedalsCount } from "@repositories";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";

export default defineAction({
  input: z.object({
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(10),
  }),
  handler: async ({ page, pageSize }, { locals: { supabase } }) => {
    const total = await getTotalMedalsCount(supabase);
    const medals = await getMedalsPaginated(supabase, { page, pageSize });

    return {
      data: medals || [],
      pagination: {
        total,
        size: medals.length,
        start: (page - 1) * pageSize + 1,
        end: (page - 1) * pageSize + medals.length,
        currentPage: page,
        lastPage: Math.ceil(total / pageSize),
      }
    };
  }
})
