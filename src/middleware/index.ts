import { sequence } from "astro:middleware";
import { middleware as authMiddleware } from "./auth";
import { middleware as supabaseMiddleware } from "./supabase";

export const onRequest = sequence(supabaseMiddleware, authMiddleware);
