import { column, defineDb, defineTable } from 'astro:db';
import { PetSchema as Schema } from '@types';

const Medal = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    species: column.text({ enum: Schema.shape.species.options }),
    breed: column.text({ optional: true }),
    birthdate: column.date({ optional: true }),
    weight: column.number({ optional: true }),
    gender: column.text({ enum: Schema.shape.gender.removeDefault().options, default: 'unknown' }),
    message: column.text({ optional: true }),
    created_at: column.date(),
    updated_at: column.date(),
  },
});

const Slot = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    used_at: column.date({ optional: true }),
    created_at: column.date(),
  }
});

const Token = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    medal_id: column.text({ references: () => Medal.columns.id }),
    used_at: column.date({ optional: true }),
    expires_at: column.date(),
    created_at: column.date(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Medal, Slot, Token }
});
