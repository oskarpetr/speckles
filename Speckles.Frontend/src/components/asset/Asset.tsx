import { IAssetShort } from "@/types/Asset.types";
import { getAssetThumbnailAlt } from "@/utils/alts";
import { formatPrice } from "@/utils/formatters";
import { getAssetImage } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";

interface Props {
  asset: IAssetShort;
  type?: "asset" | "order";
  orderId?: string;
}

export default function Asset({ asset, type = "asset", orderId }: Props) {
  const src = getAssetImage(asset.assetId, asset.thumbnail.imageId);

  // const buffer = await fetch(src).then((res) => res.arrayBuffer());
  // const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  return (
    <div className="rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300">
      <Link
        href={
          type === "asset" ? `/assets/${asset.assetId}` : `/orders/${orderId}`
        }
      >
        <Image
          src={src}
          alt={getAssetThumbnailAlt(asset.name)}
          width={500}
          height={0}
          priority
          // placeholder="blur"
          // blurDataURL={base64}
          className="w-full h-full p-0 object-cover object-center"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">{asset.name}</div>
          <div className="text-white opacity-80 font-semibold">
            {formatPrice(asset.price, asset.currency)}
          </div>
        </div>
      </Link>
    </div>
  );
}

export function SkeletonAsset() {
  return (
    <div className="rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300">
      <div>
        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">Asset</div>
          <div className="text-white opacity-80 font-semibold">
            {formatPrice(0, { currencyId: "", locale: "en-US", name: "USD" })}
          </div>
        </div>
      </div>
    </div>
  );
}
