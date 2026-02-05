import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { Resend } from "resend";
import { createClient } from "@lib/supabase";

export default defineAction({
  accept: 'form',
  input: z.object({
    to: z.string().email(),
    pet: z.preprocess(
      (value) => {
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      },
      z.object({
        id: z.string().uuid(),
        name: z.string(),
      })
    )
  }),
  handler: async ({ to, pet }, { request, url, cookies }) => {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Kodal <onboarding@resend.dev>',
      to: [to],
      subject: `Verificación de Identidad para ${pet.name}`,
      template: {
        id: 'kodal-token-1',
        variables: {
          "TOKEN": crypto.randomUUID(),
          "PET_ID": pet.id,
          "ORIGIN": url.origin
        }
      }
    });

    if (error) {
      return console.error({ error });
    }
    console.log({ data });
    return { success: true };
  }
})
