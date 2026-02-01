import { middleware } from "@middlewares/auth";
import { sequence } from "astro:middleware";

export const onRequest = sequence(middleware);
