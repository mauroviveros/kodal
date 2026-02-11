import { insertPetSchema } from '@schemas';
import { z } from 'astro/zod';
import mapKeys from 'lodash/mapKeys';
import pick from 'lodash/pick';

export const buildPetAndMedalPayloads = (input: z.infer<typeof insertPetSchema>) => {
  const pet_payload = pick(input, ['id', 'name', 'species', 'gender', 'breed', 'birth_date']);
  const medal_payload = mapKeys(
    pick(input, ['medal_id', 'medal_full_name', 'medal_email', 'medal_phone', 'medal_relation_type']),
    (_, key) => key.replace('medal_', ''),
  );

  return { medal_payload, pet_payload };
};
