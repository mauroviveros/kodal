import type { Tables } from "@/interfaces";
import { withState } from "@astrojs/react/actions";
import { actions } from "astro:actions";
import { useActionState } from "react";
import { BasicForm } from "./BasicForm";

type Props = {
  medal_id: string;
  pet: Tables<'pets'>,
  owner: Tables<'owners'>,
};

export const EditForm = ({ medal_id, pet, owner }: Props) => {
  const [state, action, pending] = useActionState(
    withState(actions.updatePet),
    { data: medal_id, error: undefined },
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="medal_id" value={medal_id} />

      <BasicForm pet={pet} />

      <button type="submit">submit</button>
    </form>
  );
};
