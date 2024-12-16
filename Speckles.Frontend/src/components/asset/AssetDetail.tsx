import { IAsset } from "@/types/Asset.types";
import AssetWithSlider from "./AssetWithSlider";
import FadeIn from "../animation/FadeIn";
import Link from "next/link";
import Image from "next/image";
import Heading from "../shared/Heading";
import { formatPrice } from "@/utils/formatters";
import Tags from "./Tags";
import AddToBasket from "./AddToBasket";
import { getStudioLogo } from "@/utils/images";

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
            alt={`${asset.studio.name}'s Logo`}
            width={50}
            height={50}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>{asset.studio.name}</div>
        </Link>

        <div>/</div>

        <div>{asset.name}</div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16">
        <AssetWithSlider asset={asset} />

        <div className="flex flex-col gap-6 mt-9">
          <div className="flex flex-col gap-2 group">
            <div className="flex items-center gap-4">
              <FadeIn
                delay={0.3}
                className="hover:relative hover:bg-neutral-200 hover:px-4 hover:py-2 rounded-lg hover:-left-4 hover:-top-2"
              >
                <Heading title={asset.name} animate={false} />
              </FadeIn>

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

            <FadeIn
              delay={0.3}
              className="group-hover:relative group-hover:-top-4"
            >
              <div>{formatPrice(asset.price, asset.currency)}</div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="flex flex-col gap-4">
            <div className="max-w-[35rem]">{asset.description}</div>

            <Tags tags={asset.tags} />
          </FadeIn>

          <FadeIn delay={0.5}>
            <AddToBasket inBasket={asset.inBasket} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
