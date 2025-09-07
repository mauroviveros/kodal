import { column, defineDb, defineTable } from 'astro:db';

const Pet = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ optional: true }),
    species: column.text({ enum: ['dog', 'cat', 'other'], optional: true }),
    breed: column.text({ optional: true }),
    birthdate: column.date({ optional: true }),
    weight: column.number({ optional: true }),
    gender: column.text({ enum: ['male', 'female', 'unknown'], optional: true }),
    message: column.text({ optional: true }),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Pet }
});
