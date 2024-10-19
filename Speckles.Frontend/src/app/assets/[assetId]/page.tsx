"use client";

import Heading from "@/components/common/Heading";
import Layout from "@/components/layout/Layout";
import { IAsset } from "@/types/Asset.types";
import { cn } from "@/utils/cn";
import { fetchAsset } from "@/utils/fetchers";
import { getAssetImage, getStudioLogo } from "@/utils/images";
import { Basket, Heart, X } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { BEZIER_CURVE } from "@/utils/anim";
import FadeIn from "@/components/anim/FadeIn";
import { formatPrice } from "@/utils/currency";
import Tags from "@/components/assets/Tags";

export default function AssetPage() {
  const { assetId } = useParams();

  // Fetch asset
  const { data, isSuccess } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => fetchAsset(assetId.toString()),
  });

  const [addedToBasket, setAddedToBasket] = useState(false);
  const [savedAsset, setSavedAsset] = useState(false);

  const assetControls = useAnimationControls();
  const saveAssetControls = useAnimationControls();

  const asset = data as IAsset;

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
    setSavedAsset((prev) => !prev);

    await saveAssetControls.start({ scale: 1.2 });
    await saveAssetControls.start({ scale: 1 });

    // request
  };

  return (
    <Layout>
      {isSuccess && (
        <div className="flex items-center gap-16">
          <FadeIn delay={0.1} className="relative">
            <Image
              key={asset.images[0].imageId}
              src={getAssetImage(asset.images[0].imageId)}
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
          </FadeIn>

          <div className="flex flex-col gap-6">
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
                          src={getAssetImage(asset.images[0].imageId)}
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
              <button
                onClick={toggleAddToBasket}
                className={cn(
                  "mt-8 flex items-center justify-center gap-2 w-full rounded-lg py-4 text-white font-bold transition-colors",
                  addedToBasket
                    ? "bg-neutral-500 hover:bg-neutral-600"
                    : "bg-green-primary hover:bg-green-primary-hover"
                )}
              >
                {addedToBasket ? <X size={24} /> : <Basket size={24} />}
                {addedToBasket ? "Remove from basket" : "Add to basket"}
              </button>
            </FadeIn>
          </div>
        </div>
      )}
    </Layout>
  );
}
