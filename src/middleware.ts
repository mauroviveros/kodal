import { sequence } from "astro:middleware";
import { middleware as authMiddleware  } from "@middlewares/auth";
import { middleware as supabaseMiddleware } from "@middlewares/supabase";

export const onRequest = sequence(supabaseMiddleware, authMiddleware);
