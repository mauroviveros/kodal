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
    const expires_at = new Date(Date.now() + 1000 * 60 * 15).toISOString(); // 15 min

    // 2. Valido que la mascota no tenga un token activo
    const { data: existing_token, error: token_query_error } = await supabase
      .from('pet_tokens')
      .select('code')
      .eq('pet_id', pet.id)
      .is('revoked_at', null)
      .gt('expires_at', new Date().toISOString())
      .limit(1)
      .maybeSingle();

    if (token_query_error) throw token_query_error;
    if (existing_token) throw new Error("A valid token already exists for this pet");

    // 3. Guardar el token en la base (para validar luego)
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
    const { error } = await resend.emails.send({
      from: import.meta.env.RESEND_FROM_EMAIL,
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
    if (error) throw error;

    return { success: true };
  }
})
