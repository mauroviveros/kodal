import { z } from "zod";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export * from "./converters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const email_mask = (email: string) => {
    const result = z.email().safeParse(email);
    if (!result.success) return email;

    return email.replace(/^(.{2}).*(@.*)$/, "$1***$2")
};

export const age_format = (birthday: Date) => {
    const today = new Date();
    const years_diff = today.getFullYear() - birthday.getFullYear();
    const months_diff = today.getMonth() - birthday.getMonth();
    const months = (years_diff * 12) + months_diff + (today.getDate() >= birthday.getDate() ? 0 : -1);

    if (months < 12) {
        const age = Math.max(months, 0);
        return months === 1 ? '1 mes' : `${age} meses`;
    }

    const age = Math.floor(months / 12);
    return age === 1 ? '1 año' : `${age} años`;
}
