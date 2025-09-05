import { column, defineDb, defineTable } from 'astro:db';

const Pet = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    species: column.text({ enum: ['dog', 'cat'] }),
    breed: column.text(),
    birthdate: column.date(),
    weight: column.number(),
    gender: column.text({ enum: ['male', 'female', 'unknown'] }),
    message: column.text({ optional: true }),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Pet }
});
