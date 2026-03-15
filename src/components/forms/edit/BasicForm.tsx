import type { Tables } from "@/interfaces"

type Props = {
  pet: Tables<'pets'>
}
export const BasicForm = ({ pet }: Props) => {
  return (
    'basic form'
  )
}
