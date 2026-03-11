import Link from "next/link";
import svg from "@/app/icon.svg";
import Image from "next/image";
export const Brand = () => (
  <Link href="/" className="hover:text-primary/80 select-none flex items-center">
    <Image src={svg} alt="Kodal" className="h-16 w-16 py-2" />

    <hgroup>
      <h2 className="text-3xl leading-6 font-bold md:text-3xl">Kodal</h2>
      <p className="text-primary text-xs leading-3 font-semibold md:text-sm">Siempre vuelven a casa</p>
    </hgroup>
  </Link>
)
