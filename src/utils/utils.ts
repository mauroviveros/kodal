import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateSince(date: Date) {
  const diff = new Date().getTime() - date.getTime(); // diferencia en milisegundos
  const rtf = new Intl.RelativeTimeFormat('es-AR', { numeric: 'always', style: 'long' });
  const since = rtf.format(-Math.floor(diff / 1000 / 60 / 60 / 24 / 365), 'years');
  return since.replace('hace ', '');
}
