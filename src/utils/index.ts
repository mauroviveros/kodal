import { v4 as uuid } from 'uuid';
import sha256 from 'crypto-js/hmac-sha256';

export const getTimeSince = (birthdate: Date) : string =>  {
  const diff = new Date().getTime() - new Date(birthdate).getTime(); // diferencia en milisegundos
  const rtf = new Intl.RelativeTimeFormat('es-AR', {numeric: 'always', style: 'long' });
  const since = rtf.format(-Math.floor(diff / 1000 / 60 / 60 / 24 / 365), 'years');
  return since.replace('hace ', ''); // elimina "hace " para que quede solo "X años"
};

// Date formatter for displaying the birthdate in input:date
export const toInputDateValue = (date: Date | string): string => {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

export const generateUUID = () => {
  return sha256(uuid() + new Date().toISOString(), 'miclavesecreta').toString();
}
