import { Constants, type Tables } from "@/interfaces"

export const convertToDefaultValues = (pet: Tables<'pets'>, owner: Tables<'owners'>) => {
  return {
    pet_name: pet.name || '',
    pet_breed: pet.breed || '',
    pet_species: pet.species || Constants.public.Enums.PET_SPECIES[2],
    pet_gender: pet.gender || Constants.public.Enums.PET_GENDER[2],
    pet_birth_date: pet.birth_date || '',
    pet_notes: pet.notes || '',

    owner_full_name: owner.full_name || '',
    owner_email: owner.email || '',
    owner_phone: owner.phone || '',
    owner_address: owner.address || '',
    owner_relation_type: owner.relation_type || Constants.public.Enums.OWNER_RELATION[0],
  }
}
