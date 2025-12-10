import { db, Medal, Slot, Token } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Medal).values([
    {
      id: '1',
      name: 'Testing',
      species: 'cat',
      // breed: 'Atigrada',
      // birthdate: new Date('2023-09-01'),
      // weight: 4.5,
      // gender: 'female',
      // message: '¡Hola! Si has encontrado a Samira, por favor contacta conmigo lo antes posible. Es muy querida y seguramente está asustada. ¡Gracias por ayudar! 🐈❤️',
      created_at: new Date(),
      updated_at: new Date()
    },
  ]);

  await db.insert(Slot).values([
    { id: '1', used_at: new Date(), created_at: new Date() },
    { id: '2', created_at: new Date() },
    { id: '3', created_at: new Date() },
    { id: '4', created_at: new Date() },
    { id: '5', created_at: new Date() },
  ]);

  await db.insert(Token).values([
    {
      id: 'prueba',
      medal_id: '1',
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
      created_at: new Date()
    },
  ]);
}
