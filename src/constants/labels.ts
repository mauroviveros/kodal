import type { Enums } from "@interfaces";

export const PET_SPECIES_LABELS: Record<Enums<'PET_SPECIES'>, string> = {
  DOG: 'Perro',
  CAT: 'Gato',
  OTHER: 'Otro'
};

export const PET_GENDER_LABELS: Record<Enums<'PET_GENDER'>, string> = {
  MALE: 'Macho',
  FEMALE: 'Hembra',
  UNKNOWN: 'No especificado'
};

export const OWNER_RELATION_LABELS: Record<Enums<'OWNER_RELATION'>, string> = {
  OWNER: 'Dueño/a',
  FATHER: 'Padre',
  MOTHER: 'Madre',
  GUARDIAN: 'Tutor/a',
  VETERINARIAN: 'Veterinario/a',
  EMERGENCY: 'Contacto de emergencia'
}
