import { defineAction } from "astro:actions";
import { MedalFormSchema } from "@/schemas";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const updatePet = defineAction({
  accept: "form",
  input: MedalFormSchema,
  handler: async (payload) => {
    console.log("Received data:", payload);
    await delay(2000); // Simula una operación asíncrona, como una llamada a la base de datos
    return payload.id;
  }
});
