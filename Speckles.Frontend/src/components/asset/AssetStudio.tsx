import Link from "next/link";
import FadeIn from "../animation/FadeIn";
import Image from "next/image";
import { getStudioLogo } from "@/utils/images";
import { getStudioLogoAlt } from "@/utils/alts";
import { IAsset } from "@/types/dtos/Asset.types";

interface Props {
  asset: IAsset;
}

export default function AssetStudio({ asset }: Props) {
  return (
    <FadeIn delay={0} className="flex items-center gap-2">
      <Link
        href={`/studios/${asset.studio.slug}`}
        className="flex items-center gap-2 w-fit"
      >
        <Image
          src={getStudioLogo(asset.studio.studioId)}
          alt={getStudioLogoAlt(asset.studio.name)}
          width={50}
          height={50}
          className="w-6 h-6 rounded-full object-cover"
        />
        <div>{asset.studio.name}</div>
      </Link>

      <div>/</div>

      <div>{asset.name}</div>
    </FadeIn>
  );
}
