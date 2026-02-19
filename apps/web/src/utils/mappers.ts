import type { insertPetSchema } from "@schemas";
import type { Tables } from "@types";
import type { z } from "astro/zod";
import mapKeys from 'lodash/mapKeys';
import pick from 'lodash/pick';

const getTimeSince = (birthdate: Date): string => {
  const diff = new Date().getTime() - new Date(birthdate).getTime(); // diferencia en milisegundos
  const rtf = new Intl.RelativeTimeFormat('es-AR', { numeric: 'always', style: 'long' });
  const since = rtf.format(-Math.floor(diff / 1000 / 60 / 60 / 24 / 365), 'years');
  return since.replace('hace ', ''); // elimina "hace " para que quede solo "X años"
};

export const buildPetInfo = (pet: Tables<'pets'>) => {
  return [
    {
      label: 'Raza',
      value: pet.breed,
      display: pet.breed,
    },
    {
      label: 'Edad',
      value: pet.birth_date,
      display: pet.birth_date && getTimeSince(new Date(pet.birth_date)),
    },
  ].filter(({ value }) => value);
};

export const buildPetContactInfo = (medal: Tables<'medals'>) => {
  return [
    {
      label: 'Su Teléfono es:',
      value: medal.phone,
      display: medal.phone,
      icon: 'lucide:phone',
    },
    {
      label: 'Su correo electrónico es:',
      value: medal.email,
      display: medal.email,
      icon: 'lucide:mail',
    },
    {
      label: 'Su dirección es:',
      value: medal.address,
      display: medal.address,
      icon: 'lucide:map-pin',
    },
  ].filter(({ value }) => value);
};

export const buildPetAndMedalPayloads = (input: z.infer<typeof insertPetSchema>) => {
  const pet_payload = pick(input, ['id', 'name', 'species', 'gender', 'breed', 'birth_date']);
  const medal_payload = mapKeys(
    pick(input, ['medal_id', 'medal_full_name', 'medal_email', 'medal_phone', 'medal_relation_type']),
    (_, key) => key.replace('medal_', ''),
  );

  return { medal_payload, pet_payload };
};
