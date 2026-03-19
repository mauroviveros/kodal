import { Constants, type Tables } from "@/interfaces"
import z from "zod";

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

export const email_mask = (email: string) => {
    const result = z.email().safeParse(email);
    if (!result.success) return email;

    return email.replace(/^(.{2}).*(@.*)$/, "$1***$2")
};

export const age_format = (birthday: Date) => {
    const today = new Date();
    const years_diff = today.getFullYear() - birthday.getFullYear();
    const months_diff = today.getMonth() - birthday.getMonth();
    const months = (years_diff * 12) + months_diff + (today.getDate() >= birthday.getDate() ? 0 : -1);

    if (months < 12) {
        const age = Math.max(months, 0);
        return months === 1 ? '1 mes' : `${age} meses`;
    }

    const age = Math.floor(months / 12);
    return age === 1 ? '1 año' : `${age} años`;
}
