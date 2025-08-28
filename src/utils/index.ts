export const getTimeSince = (birthdate: Date) : string =>  {
  const diff = new Date().getTime() - new Date(birthdate).getTime(); // diferencia en milisegundos
  const rtf = new Intl.RelativeTimeFormat('es-AR', {numeric: 'always', style: 'long' });
  const since = rtf.format(-Math.floor(diff / 1000 / 60 / 60 / 24 / 365), 'years');
  return since.replace('hace ', ''); // elimina "hace " para que quede solo "X años"
};
