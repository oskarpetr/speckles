import { useBasketMutation } from "@/hooks/useApi";
import { IAssetShort } from "@/types/dtos/Asset.types";
import { getAssetThumbnailAlt } from "@/utils/alts";
import { getAssetImage } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import AssetPrice from "../asset/AssetPrice";
import RoundedButton from "../shared/RoundedButton";

interface Props {
  asset: IAssetShort;
}

export default function BasketItem({ asset }: Props) {
  // basket mutation
  const basketMutation = useBasketMutation(asset.assetId, false);

  // on delete
  const onDelete = async () => {
    await basketMutation.mutateAsync();
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="w-[calc(100%*2/9)]">
        <Link href={`/assets/${asset.assetId}`}>
          <Image
            src={getAssetImage(asset.assetId, asset.thumbnail.imageId)}
            alt={getAssetThumbnailAlt(asset.name)}
            width={256}
            height={0}
            className="w-44 rounded-lg"
          />
        </Link>
      </td>

      <td className="pl-8 w-[calc(100%*3/9)]">
        <div className="font-bold">{asset.name}</div>
        <div className="opacity-80">
          {asset.tags.map((x) => x.name).join(", ")}
        </div>
      </td>

      <td className="w-[calc(100%*3/9)]">
        <div className="font-bold">Price</div>
        <div className="opacity-80">
          <AssetPrice
            price={asset.price}
            currencyName={asset.currency.name}
            color="black"
          />
        </div>
      </td>

      <td className="w-[calc(100%*1/9)]">
        <RoundedButton icon="X" colorType="secondary" onClick={onDelete} />
      </td>
    </tr>
  );
}
