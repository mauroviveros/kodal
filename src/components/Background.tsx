import { Bone, Fish, PawPrint, Star } from "lucide-react";
import { cn } from "@/utils";
import { Enums } from "@/types";

type Props = {
  species: Enums<'PET_SPECIES'>
  gender: Enums<'PET_GENDER'>
}
export const Background = ({ species, gender }: Props) => {
  function getPatternElements(species: Enums<'PET_SPECIES'>) {
    switch (species) {
      case "DOG":
        return { primary: PawPrint, secondary: Bone }
      case "CAT":
        return { primary: PawPrint, secondary: Fish }
      default:
        return { primary: Star, secondary: PawPrint }
    }
  }

  const CLASSES: Record<Enums<'PET_GENDER'>, string> = {
    FEMALE: 'from-pink-400/20 via-rose-400/10 to-fuchsia-400/20 text-pink-400/40',
    MALE: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20 text-sky-500/40',
    UNKNOWN: 'from-primary/10 via-secondary/10 to-secondary/20 text-primary/40',
  };

  const { primary: Primary, secondary: Secondary } = getPatternElements(species);
  return (
    <div className={cn("absolute inset-0 top-0 size-full bg-linear-to-br", CLASSES[gender])}>
      <Primary className="absolute -top-1 left-[5%] h-10 w-10 rotate-[-20deg]" />
      <Secondary className="absolute top-3 left-[25%] h-8 w-12 rotate-15" />
      <Primary className="absolute top-1 left-[50%] h-8 w-8 rotate-10" />
      <Secondary className="absolute -top-2 left-[75%] h-7 w-10 rotate-[-10deg]" />
      <Primary className="absolute top-4 left-[92%] h-9 w-9 rotate-25" />

      <Secondary className="absolute top-[30%] left-[0%] h-7 w-11 rotate-20" />
      <Primary className="absolute top-[25%] left-[18%] h-9 w-9 rotate-[-15deg]" />
      <Secondary className="absolute top-[35%] left-[38%] h-9 w-13 rotate-[5deg]" />
      <Primary className="absolute top-[28%] left-[60%] h-7 w-7 rotate-30" />
      <Secondary className="absolute top-[32%] left-[82%] h-7 w-10 rotate-[-25deg]" />

      <Primary className="absolute top-[55%] left-[8%] h-10 w-10 rotate-15" />
      <Secondary className="absolute top-[60%] left-[30%] h-8 w-12 rotate-[-8deg]" />
      <Primary className="absolute top-[52%] left-[55%] h-8 w-8 rotate-[-20deg]" />
      <Secondary className="absolute top-[58%] left-[72%] h-6 w-9 rotate-18" />
      <Primary className="absolute top-[50%] left-[90%] h-11 w-11 -rotate-12" />

      <Secondary className="absolute top-[78%] left-[3%] h-7 w-10 rotate-[-5deg]" />
      <Primary className="absolute top-[82%] left-[22%] h-8 w-8 rotate-22" />
      <Secondary className="absolute top-[85%] left-[45%] h-7 w-11 rotate-[-15deg]" />
      <Primary className="absolute top-[80%] left-[65%] h-9 w-9 rotate-[8deg]" />
      <Secondary className="absolute top-[88%] left-[85%] h-8 w-12 rotate-12" />
    </div>
  )
}