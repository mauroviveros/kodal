import insertPetForm from './insertPetForm';
import updatePetForm from './updatePetForm';
import createBulkMedals from './createBulkMedals';
import getMedal from './getMedal';
import getMedalsPaginated from './getMedalsPaginated';
import sendTokenEmail from './sendTokenEmail';

export const server = {
  getMedal,
  getMedalsPaginated,
  insertPetForm,
  updatePetForm,
  createBulkMedals,
  sendTokenEmail,
}
