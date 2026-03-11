'use server'
import { z } from 'zod'
import { createClient } from '@/supabase';

type ValidationIdentityState = {
  error: string;
  success: boolean;
}

const schema = z.object({
  email: z.email(),
  medal_id: z.string().uuid()
})

export const sendValidationIdentityEmail = async (
  _prevState: ValidationIdentityState,
  formData: FormData
): Promise<ValidationIdentityState> => {
  const supabase = createClient();
  const { data, success, error } = schema.safeParse({
    email: formData.get("email"),
    medal_id: formData.get("medal_id"),
  });

  if (!success) {
    const treeify = z.treeifyError(error);
    const errorMessage = treeify.properties?.email?.errors[0] || treeify.properties?.medal_id?.errors[0] || "Error desconocido";
    return { error: errorMessage, success: false }
  }

  // // 2. Verificar que el email corresponda con el dueño de la mascota
  const { data: owner, error: owner_error } = await supabase
    .from('medal_owners')
    .select('id')
    .eq('email', data.email)
    .eq('medal_id', data.medal_id)
    .single()

  if (owner_error || !owner) {
    return { error: "El email no corresponde al dueño de la mascota", success: false }
  }

  // 3. Enviar email de verificación (esto es un placeholder, deberías integrar un servicio de email real)
  console.log(`Enviando email de verificación a ${data.email} para la mascota con ID ${data.medal_id}`);



  return { error: "", success: true }
}
