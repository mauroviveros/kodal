'use client'

import { Form, useForm } from "react-hook-form"
import { MedalPetForm } from "./medal/MedalPetForm";
import { InsertMedalInput } from "@/types/medal";

export const FormMedalInsert = () => {
  const form = useForm<InsertMedalInput>({
    // defaultValues: {
    //   pet: {
    //     species: "DOG"
    //   }
    // }
  });

  return (
    <Form control={form.control}>
      <MedalPetForm control={form.control}/>
    </Form>
  )
}


export const FormMedalUpdate = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({});

  return (
    <Form>
    </Form>
  )
}
