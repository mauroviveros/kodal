import { Tables } from "@/types";
import { formatDateSince } from "./utils";

export const petInfoMapper = (pet: Tables<"medal_pets">) => {
  return [
    {
      label: 'Raza',
      value: pet.breed,
      display: pet.breed,
    },
    {
      label: 'Edad',
      value: pet.birth_date,
      display: pet.birth_date && formatDateSince(new Date(pet.birth_date)),
    },
  ].filter(({ value }) => value);
}