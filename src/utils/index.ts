import { z } from "astro/zod";

export const email_mask = (email: string) => {
    const result = z.email().safeParse(email);
    if (!result.success) return email;

    return email.replace(/^(.{2}).*(@.*)$/, "$1***$2")
};