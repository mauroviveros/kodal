import { customAlphabet } from 'nanoid';
import QRCode from 'qrcode';

export const generateNanoID = () => {
  const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(ALPHABET, 16)();
}

export const generateQR = async (url: URL): Promise<string> => {
  return await QRCode.toDataURL(url.toString(), {
    margin: 1,
    width: 300,
  });
};
