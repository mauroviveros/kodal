import { InsertMedalInput, InsertMedalResult, InsertMedalSchema } from "@/types/medal"

type ServerAction<T, U> = (_state: T, payload: U) => Promise<T>
export const insertMedal: ServerAction<InsertMedalResult, InsertMedalInput> = async (_state, payload) => {
  const parsed = InsertMedalSchema.safeParse(payload)
  if (!parsed.success) return { success: false }


  return { success: true }
}

export const updateMedal: ServerAction<InsertMedalResult, InsertMedalInput> = async (_state, payload) => {
  const parsed = InsertMedalSchema.safeParse(payload)
  if (!parsed.success) return { success: false }

  return { success: true }
}
