import insertPetForm from './insertPetForm';
import updatePetForm from './updatePetForm';
import getMedal from './getMedal';
import getMedalsPaginated from './getMedalsPaginated';
import createBulkMedals from './createBulkMedals';
import sendTokenEmail from './sendTokenEmail';


export const server = {
  getMedal,
  getMedalsPaginated,
  insertPetForm,
  updatePetForm,
  createBulkMedals,
  sendTokenEmail,
}
