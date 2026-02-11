import QRCode from 'qrcode';
export * from './mappers';

export const generateQR = async (url: URL): Promise<string> => {
  return await QRCode.toDataURL(url.toString(), {
    margin: 1,
  });
};
