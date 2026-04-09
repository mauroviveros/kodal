import { Resend } from 'resend';
import type { Tables } from "@/interfaces";
import { SEND_VERIFICATION_EMAIL } from '@/constants';

interface SendVerificationCodeEmailProps {
  medal_id: Tables<'owners'>['medal_id']
  owner_email: Tables<'owners'>['email']
  pet_name: Tables<'pets'>['name']
  token_code: Tables<'tokens'>['code']
  origin: string
}
export const sendVerificationCodeEmail = async (
  { medal_id, owner_email, pet_name, token_code, origin }: SendVerificationCodeEmailProps,
) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: SEND_VERIFICATION_EMAIL.from,
    to: [owner_email],
    subject: `Verificación de Identidad para ${pet_name}`,
    template: {
      id: SEND_VERIFICATION_EMAIL.template_id,
      variables: {
        EDIT_PATH: `medal/${medal_id}/edit?token=${token_code}`,
        ORIGIN: origin
      },
    },
  })

  if(error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }

  return data.id;
}
