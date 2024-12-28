import { IStudioShort } from "@/types/Studio.types";
import Link from "next/link";
import Image from "next/image";
import { getStudioLogo } from "@/utils/images";

interface Props {
  studio: IStudioShort;
}

export default function Studio({ studio }: Props) {
  return (
    <div className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-9 bg-neutral-300">
      <Link href={`/studios/${studio.slug}`}>
        <Image
          src={getStudioLogo(studio.studioId)}
          alt={`${studio.name}'s Logo`}
          width={300}
          height={0}
          className="w-full aspect-w-16 aspect-h-9 p-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">{studio.name}</div>
        </div>
      </Link>
    </div>
  );
}
