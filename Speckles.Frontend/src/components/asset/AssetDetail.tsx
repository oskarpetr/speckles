import { IAsset } from "@/types/Asset.types";
import AssetThumbnails from "./AssetThumbnails";
import FadeIn from "../animation/FadeIn";
import Link from "next/link";
import Image from "next/image";
import Heading from "../shared/Heading";
import Tags from "./Tags";
import AddToBasket from "./AddToBasket";
import { getStudioLogo } from "@/utils/images";
import { getStudioLogoAlt } from "@/utils/alts";
import AssetPrice from "./AssetPrice";
import Description from "../shared/Description";

interface Props {
  asset: IAsset;
}

export default function AssetDetail({ asset }: Props) {
  return (
    <div className="flex flex-col gap-8">
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

      <div className="flex flex-col lg:flex-row gap-12">
        <AssetThumbnails asset={asset} />

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

          <FadeIn delay={0.4} className="flex flex-col gap-4 relative -z-10">
            <Description text={asset.description} />
            <Tags tags={asset.tags} />
          </FadeIn>

          <FadeIn delay={0.5}>
            <AddToBasket asset={asset} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
