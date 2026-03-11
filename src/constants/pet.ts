import { Enums } from "@/types";


export const PET_ESPECIES: { value: Enums<'PET_SPECIES'>; label: string }[] = [
  { value: 'DOG', label: 'Perro' },
  { value: 'CAT', label: 'Gato' },
  { value: 'OTHER', label: 'Otro' },
];

export const PET_GENDERS: { value: Enums<'PET_GENDER'>; label: string }[] = [
  { value: 'MALE', label: 'Macho' },
  { value: 'FEMALE', label: 'Hembra' },
  { value: 'UNKNOWN', label: 'No especificado' },
];
export const CONTACT_RELATIONS: { value: Enums<'CONTACT_RELATION'>; label: string }[] = [
  { value: 'OWNER', label: 'Dueño/a' },
  { value: 'FATHER', label: 'Padre' },
  { value: 'MOTHER', label: 'Madre' },
  { value: 'GUARDIAN', label: 'Tutor/a' },
  { value: 'VETERINARIAN', label: 'Veterinario/a' },
  { value: 'EMERGENCY', label: 'Contacto de emergencia' },
];