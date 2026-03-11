
import { Card } from "@/components/ui";
import { PetAvatar } from "@/components";
import { Background } from "./background";
import { cn, petInfoMapper } from "@/utils";
import { Tables } from "@/types";

export const HeroCard = async ({ pet }: { pet: Tables<"medal_pets"> }) => {
  const PET_INFO = petInfoMapper(pet);
  return (
    <Card className="shadow-lg py-6 gap-6">
      <header className="relative overflow-hidden p-8 space-y-5 text-center">
        <Background gender={pet.gender} species={pet.species} />

        <figure className="relative size-52 overflow-hidden rounded-full ring-primary/20 bg-primary/20 ring-4 shadow-xl select-none mx-auto">
          <PetAvatar path={pet.avatar_path} name={pet.name} className="size-52" />
        </figure>

        <h1 className="text-3xl font-bold text-foreground mb-1 text-balance">{pet.name}</h1>
      </header>

      <section
        className={cn(
          "grid sm:divide-x sm:divide-y-0 divide-border border-y grid-cols-1 divide-y sm:grid-rows-1",
          PET_INFO.length === 2 && 'md:grid-cols-2',
          PET_INFO.length === 3 && 'md:grid-cols-3'
        )}
      >
        {PET_INFO.map(({ label, display }) => (
          <div className="text-center py-4" key={label}>
            <div className="text-xl font-bold text-primary">{display}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </section>
    </Card>
  )
}
