import z from "zod";

const InsertMedalSchema = z.object({});
type InsertMedalInput = z.infer<typeof InsertMedalSchema>;
export type InsertMedalResult = {
  success: boolean;
}

export const insertMedal = async (
  input: InsertMedalInput
): Promise<InsertMedalResult> => {
  const parsed = InsertMedalSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false }
  }

  return { success: true }
}
