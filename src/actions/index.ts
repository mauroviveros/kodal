import insertPetForm from './insertPetForm';
import updatePetForm from './updatePetForm';
import getMedalPet from './getMedalPet';
import getMedalsPaginated from './getMedalsPaginated';
import createBulkMedals from './createBulkMedals';
import sendTokenEmail from './sendTokenEmail';

export const server = {
  getMedalPet,
  getMedalsPaginated,
  insertPetForm,
  updatePetForm,
  createBulkMedals,
  sendTokenEmail,
};
