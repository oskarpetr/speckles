import { IAsset } from "@/types/dtos/Asset.types";
import Heading from "../shared/Heading";
import FadeIn from "../animation/FadeIn";
import AssetPrice from "./AssetPrice";
import Description from "../shared/Description";
import Tags from "./Tags";
import AddToBasket from "./AddToBasket";

interface Props {
  asset: IAsset;
}

export default function AssetInfo({ asset }: Props) {
  return (
    <div className="flex flex-col gap-6 mt-0 lg:mt-12">
      <div className="flex flex-col gap-2 group">
        <div className="flex items-center gap-4">
          <Heading title={asset.name} delay={0.3} />

          {/* <AnimatePresence mode="wait">
            {!addedToBasket && (
                <motion.div
                initial={{ scale: 0 }}
                animate={assetControls}
                transition={{ duration: 1, ease: BEZIER_CURVE }}
                className="absolute z-20"
                >
                <div className="w-16 h-16 flex items-center justify-center bg-black-primary rounded-full overflow-hidden border-1 border-black-primary">
                    <Image
                    src={getAssetImage(
                        asset.assetId,
                        asset.images[0].imageId
                    )}
                    alt={asset.images[0].alt}
                    width={64}
                    height={64}
                    className="object-cover h-full"
                    />
                    <ShoppingCart size={24} />
                </div>
                </motion.div>
            )}
            </AnimatePresence> */}
        </div>

        <FadeIn delay={0.3}>
          <AssetPrice
            price={asset.price}
            currency={asset.currency}
            color="black"
            showOriginal
          />
        </FadeIn>
      </div>

      <div className="flex flex-col gap-4">
        <FadeIn delay={0.4} className="relative -z-10">
          <Description text={asset.description} />
        </FadeIn>

        <FadeIn delay={0.4}>
          <Tags tags={asset.tags} />
        </FadeIn>
      </div>

      <FadeIn delay={0.5}>
        <AddToBasket asset={asset} />
      </FadeIn>
    </div>
  );
}
