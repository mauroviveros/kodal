import { column, defineDb, defineTable } from 'astro:db';
import { PetSchema as Schema } from '@types';

const Pet = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ optional: true }),
    species: column.text({ enum: Schema.shape.species.options, optional: true }),
    breed: column.text({ optional: true }),
    birthdate: column.date({ optional: true }),
    weight: column.number({ optional: true }),
    gender: column.text({ enum: Schema.shape.gender.removeDefault().options, optional: true }),
    message: column.text({ optional: true }),

    owner_name: column.text({ optional: true }),
    owner_relationship: column.text({ optional: true }),
    owner_phone: column.text({ optional: true }),
    owner_email: column.text({ optional: true }),
    owner_address: column.text({ optional: true }),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Pet }
});
