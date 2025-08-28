type Species = 'dog' | 'cat';
type Gender = 'male' | 'female' | 'unknown';

export interface Pet {
  readonly id: string;
  name: string;
  species: Species;
  breed: string;
  birthdate: Date;
  weight: number;
  gender: Gender;
  message?: string;
  readonly avatarUrl?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
