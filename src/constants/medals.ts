import type { Enums } from "@types";

export const MEDAL_RELATIONS: Record<Enums<'MEDAL_RELATION'>, string> = {
  OWNER: 'Dueño/a',
  FATHER: 'Padre',
  MOTHER: 'Madre',
  GUARDIAN: 'Tutor/a',
  VETERINARIAN: 'Veterinario/a',
  EMERGENCY: 'Contacto de emergencia',
};

export const MEDAL_STATUS: Record<
  Enums<'MEDAL_STATUS'>,
  { text: string; icon: string; class: string }
> = {
  CREATED: {
    text: 'Nuevo',
    icon: 'lucide:sparkles',
    class: 'text-blue-600 bg-blue-100 border-blue-300!',
  },
  MANUFACTURED: {
    text: 'Fabricado',
    icon: 'lucide:factory',
    class: 'text-yellow-600 bg-yellow-100 border-yellow-300',
  },
  ACTIVE: {
    text: 'En uso',
    icon: 'lucide:user-check',
    class: 'text-emerald-600 bg-emerald-100 border-emerald-300!',
  },
  LOST: {
    text: 'Perdido',
    icon: 'lucide:alert-triangle',
    class: 'text-red-600 bg-red-100 border-red-300',
  },
  DISABLED: {
    text: 'Desactivado',
    icon: 'lucide:slash',
    class: 'text-gray-600 bg-gray-100 border-gray-300',
  },
};
