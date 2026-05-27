import type { Enums } from "@/interfaces";

export const MEDAL_STATUS_LABELS: Record<Enums<'MEDAL_STATUS'>, { label: string; badge: string }> = {
  CREATED: { label: 'Creada', badge: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300' },
  MANUFACTURED: { label: 'Fabricada', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  ACTIVE: { label: 'En uso', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  LOST: { label: 'Perdida', badge: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  DISABLED: { label: 'Deshabilitada', badge: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300' },
};

export const PET_SPECIES_LABELS: Record<Enums<'PET_SPECIES'>, { label: string; icon: string }> = {
  DOG: { label: 'Perro', icon: 'lucide:dog' },
  CAT: { label: 'Gato', icon: 'lucide:cat' },
  OTHER: { label: 'Otro', icon: 'lucide:squirrel' }
};

export const PET_GENDER_LABELS: Record<Enums<'PET_GENDER'>, { label: string; icon: string }> = {
  MALE: { label: 'Macho', icon: 'lucide:mars' },
  FEMALE: { label: 'Hembra', icon: 'lucide:venus' },
  UNKNOWN: { label: 'No especificado', icon: 'lucide:venus-and-mars' }
};

export const PET_STATUS_LABELS: Record<Enums<'PET_STATUS'>, { label: string; badge: string }> = {
  ACTIVE: { label: 'Activo', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  LOST: { label: 'Perdido', badge: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  DECEASED: { label: 'Fallecido', badge: 'bg-neutral-200 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-300' },
};

export const OWNER_RELATION_LABELS: Record<Enums<'OWNER_RELATION'>, { label: string; icon: string }> = {
  OWNER: { label: 'Dueño/a', icon: 'lucide:user' },
  FATHER: { label: 'Padre', icon: 'lucide:message-circle-heart' },
  MOTHER: { label: 'Madre', icon: 'lucide:message-circle-heart' },
  GUARDIAN: { label: 'Tutor/a', icon: 'lucide:shield-user' },
  VETERINARIAN: { label: 'Veterinario/a', icon: 'lucide:hospital' },
  EMERGENCY: { label: 'Contacto de emergencia', icon: 'lucide:briefcase-medical' }
}
