import { sequence } from "astro:middleware";
import { middleware as authMiddleware } from "./middleware/auth";
import { middleware as supabaseMiddleware } from "./middleware/supabase";

export const onRequest = sequence(supabaseMiddleware, authMiddleware);
