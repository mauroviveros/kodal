import z from 'zod';
export * from './medal';

export const VerificationCodeSchema = z.object({
  medal_id: z.uuid().nonempty(),
  email: z.email().nonempty(),
});
export type VerificationCodeInput = z.infer<typeof VerificationCodeSchema>;
