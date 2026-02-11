import type { Enums } from '@types';

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
