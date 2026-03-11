import { supabase } from "@/supabase";
import { cn } from "@/utils";
import Image from "next/image";

type Props = {
  path?: string | null;
  name: string;
}
export const PetAvatar = ({ path, name, className }: React.ComponentProps<"figure"> & Props) => {
  const { data: { publicUrl } } = path
    ? supabase.storage.from("pet_avatars").getPublicUrl(path)
    : { data: { publicUrl: undefined as string | undefined } };

  const url = publicUrl;

  return (
    <figure className={cn(
      "relative overflow-hidden rounded-full ring-primary/20 bg-primary/20 ring-4 shadow-xl select-none",
      className
    )}>
      {url ? (
        <Image
          src={url}
          alt={`Foto de ${name}`}
          fill
          className="aspect-square size-full object-cover"
          loading="eager"
        />
      ) : (
        <span className="flex size-full items-center justify-center text-6xl font-bold bg-primary/80 text-primary-foreground">
          {(name || '�').charAt(0)}
        </span>
      )}
    </figure>
  )
}
