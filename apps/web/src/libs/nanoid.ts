import { customAlphabet } from 'nanoid';
export { nanoid } from 'nanoid';
export const generateNanoID = () => {
  const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(ALPHABET, 16)();
}
