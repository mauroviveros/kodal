import type { Enums } from "@lib/database";

export const RESEND_TEMPLATES = {
  IDENTITY_VERIFICATION: 'kodal-token-1',
}

export const MEDAL_RELATIONS: Record<Enums<'MEDAL_RELATION'>, string> = {
  OWNER: 'Dueño/a',
  FATHER: 'Padre',
  MOTHER: 'Madre',
  GUARDIAN: 'Tutor/a',
  VETERINARIAN: 'Veterinario/a',
  EMERGENCY: 'Contacto de emergencia',
};
