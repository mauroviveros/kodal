import type { Enums } from "@/interfaces";

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

export const OWNER_RELATION_LABELS: Record<Enums<'OWNER_RELATION'>, { label: string; icon: string }> = {
  OWNER: { label: 'Dueño/a', icon: 'lucide:user' },
  FATHER: { label: 'Padre', icon: 'lucide:message-circle-heart' },
  MOTHER: { label: 'Madre', icon: 'lucide:message-circle-heart' },
  GUARDIAN: { label: 'Tutor/a', icon: 'lucide:shield-user' },
  VETERINARIAN: { label: 'Veterinario/a', icon: 'lucide:hospital' },
  EMERGENCY: { label: 'Contacto de emergencia', icon: 'lucide:briefcase-medical' }
}
