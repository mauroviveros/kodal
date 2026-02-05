import getToken from './getToken';
import insertPetForm from './insertPetForm';
import updatePetForm from './updatePetForm';
import createBulkMedals from './createBulkMedals';
import getMedal from './getMedal';
import { generateToken } from './pets';
import getMedalsPaginated from './getMedalsPaginated';
import sendTokenEmail from './sendTokenEmail';

export const server = {
  getMedal,
  getMedalsPaginated,
  generateToken,
  insertPetForm,
  updatePetForm,
  getToken,
  createBulkMedals,
  sendTokenEmail,
}
