import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { Resend } from "resend";
import { createClient } from "@lib/supabase";

export default defineAction({
  accept: 'form',
  input: z.object({
    medal: z.preprocess(
      (value) => JSON.parse(typeof value === 'string' ? value : JSON.stringify(value)),
      z.object({
        id: z.string().uuid(),
        email: z.string().email(),
      })
    ),
    pet: z.preprocess(
      (value) => JSON.parse(typeof value === 'string' ? value : JSON.stringify(value)),
      z.object({
        id: z.string().uuid(),
        name: z.string(),
      })
    )
  }),
  handler: async ({ medal, pet }, { url, request, cookies }) => {
    const supabase = createClient(request, cookies);

    // 1. Generar token seguro y expiración
    const token_code = crypto.randomUUID();
    const expires_at = new Date(Date.now() + 1000 * 60 * 30).toISOString(); // 30 min

    // // 2. Validar que el mail se envíe al email registrado en la medalla
    // const { data: medal, error: medal_error } = await supabase
    //   .from('medals')
    //   .select('email')
    //   .eq('id', pet.id)
    //   .limit(1)
    //   .single();
    // if (medal_error || !medal) throw new Error("Medal not found");
    // if (medal.email !== to) throw new Error("Email does not match medal record");

    // 2. Guardar el token en la base (para validar luego)
    const { error: token_error } = await supabase
      .from('pet_tokens')
      .insert({
        code: token_code,
        pet_id: pet.id,
        expires_at,
      });
    if (token_error) throw token_error;

    // 3. Enviar el correo
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Kodal <onboarding@resend.dev>',
      to: [medal.email],
      subject: `Verificación de Identidad para ${pet.name}`,
      template: {
        id: 'kodal-token-1',
        variables: {
          "TOKEN": token_code,
          "ORIGIN": url.origin,
          "MEDAL_ID": medal.id,
        }
      }
    });

    // 5. Manejo de errores
    if (error) throw error;

    return { success: true, data };
  }
})
