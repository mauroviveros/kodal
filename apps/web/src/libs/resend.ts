import { RESEND_TEMPLATES } from '@constants';
import { Resend } from 'resend';

export const sendVerificationEmail = async ({
  email,
  origin,
  pet_name,
  edit_url,
}: {
  email: string;
  origin: string;
  pet_name: string;
  edit_url: string;
}) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: import.meta.env.RESEND_FROM_EMAIL,
    to: [email],
    subject: `Verificación de Identidad para ${pet_name}`,
    template: {
      id: RESEND_TEMPLATES.IDENTITY_VERIFICATION,
      variables: {
        EDIT_URL: edit_url,
        ORIGIN: origin,
      },
    },
  });

  if (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }

  return data;
};
