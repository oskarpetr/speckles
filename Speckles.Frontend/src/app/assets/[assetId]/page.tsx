"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import { IAsset } from "@/types/Asset.types";
import { cn } from "@/utils/cn";
import { fetchAsset, postSavedAsset } from "@/utils/fetchers";
import { getAssetImage, getStudioLogo } from "@/utils/images";
import { Heart } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { BEZIER_CURVE } from "@/utils/animation";
import FadeIn from "@/components/animation/FadeIn";
import { formatPrice } from "@/utils/formatters";
import Tags from "@/components/asset/Tags";
import RoundedButton from "@/components/common/RoundedButton";
import Comments from "@/components/asset/Comments";
import Button from "@/components/common/Button";

export default function AssetPage() {
  const memberId = "0f44ee84-dcf2-483c-a084-102712b6b19e";

  const { assetId } = useParams();

  // Fetch asset
  const assetQuery = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => fetchAsset(assetId.toString()),
  });

  const [activeImage, setActiveImage] = useState(0);

  const [addedToBasket, setAddedToBasket] = useState(false);
  const [savedAsset, setSavedAsset] = useState(false);

  const assetControls = useAnimationControls();
  const saveAssetControls = useAnimationControls();

  const asset = assetQuery.data as IAsset;

  // Post saved
  const postSavedQuery = useQuery({
    queryKey: ["saved", memberId, assetId],
    queryFn: () => postSavedAsset(memberId, assetId.toString()),
    enabled: false,
  });

  const toggleAddToBasket = async () => {
    if (!addedToBasket) {
      await assetControls.start({ scale: 1 }, { duration: 0.3 });
      await assetControls.start({ top: 14, right: 155 });
      await assetControls.start({ scale: 0 }, { duration: 0.3 });
    }

    setAddedToBasket((prev) => !prev);

    // request
  };

  const toggleSaveAsset = async () => {
    postSavedQuery.refetch();

    setSavedAsset((prev) => !prev);

    await saveAssetControls.start({ scale: 1.2 });
    await saveAssetControls.start({ scale: 1 });
  };

  return (
    <Layout>
      {assetQuery.isSuccess && (
        <div className="flex flex-col gap-32">
          <div className="flex gap-16">
            <FadeIn delay={0.1} className="flex flex-col gap-4 relative">
              <Image
                key={asset.images[0].imageId}
                src={getAssetImage(
                  asset.assetId,
                  asset.images[activeImage].imageId
                )}
                alt={asset.images[0].alt}
                width={600}
                height={0}
                className="rounded-lg"
              />

              <motion.button
                animate={saveAssetControls}
                transition={{ duration: 0.3, ease: BEZIER_CURVE }}
                onClick={toggleSaveAsset}
                className="absolute top-8 right-8 drop-shadow-2xl"
              >
                <Heart
                  size={32}
                  color="white"
                  weight={savedAsset ? "fill" : "regular"}
                />
              </motion.button>

              <div className="flex items-center justify-between">
                <RoundedButton icon="CaretLeft" colorType="secondary" />

                <div className="flex gap-4">
                  {asset.images.map((image, index) => (
                    <Image
                      key={image.imageId}
                      src={getAssetImage(asset.assetId, image.imageId)}
                      alt={image.alt}
                      width={80}
                      height={0}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "rounded-lg transition-all cursor-pointer",
                        activeImage === index
                          ? "border-[3px] border-transparent outline outline-[3px] outline-green-primary"
                          : ""
                      )}
                    />
                  ))}
                </div>

                <RoundedButton icon="CaretRight" colorType="secondary" />
              </div>
            </FadeIn>

            <div className="flex flex-col gap-6 mt-9">
              <FadeIn delay={0.2}>
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
              </FadeIn>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <FadeIn delay={0.3}>
                    <Heading title={asset.name} animate={false} />
                  </FadeIn>

                  <AnimatePresence mode="wait">
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
                          {/* <ShoppingCart size={24} /> */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <FadeIn delay={0.3}>
                  <div>{formatPrice(asset.price, asset.currency)}</div>
                </FadeIn>
              </div>

              <FadeIn delay={0.4} className="flex flex-col gap-4">
                <div className="max-w-[35rem]">{asset.description}</div>

                <Tags tags={asset.tags} />
              </FadeIn>

              <FadeIn delay={0.5}>
                <Button
                  onClick={toggleAddToBasket}
                  type={addedToBasket ? "cancel" : "primary"}
                  icon={addedToBasket ? "X" : "Basket"}
                  text={addedToBasket ? "Remove from basket" : "Add to basket"}
                />
              </FadeIn>
            </div>
          </div>

          <Comments comments={asset.comments} />
        </div>
      )}
    </Layout>
  );
}
