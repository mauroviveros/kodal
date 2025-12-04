import { db, Pet } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Pet).values([
    {
      id: '1',
      name: 'Testing',
      species: 'cat',
      breed: 'Atigrada',
      birthdate: new Date('2023-09-01'),
      weight: 4.5,
      gender: 'female',
      message: '¡Hola! Si has encontrado a Samira, por favor contacta conmigo lo antes posible. Es muy querida y seguramente está asustada. ¡Gracias por ayudar! 🐈❤️',
      owner_email: 'maurod.viveros@gmail.com',
      owner_phone: '+5491151423888'
    },
    {
      id: '2',
    }
  ]);
}
