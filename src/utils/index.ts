import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export * from "./converters";
export * from "./lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

