import Image from "next/image";
import FadeIn from "../animation/FadeIn";
import { getAssetImage } from "@/utils/images";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { IAsset } from "@/types/dtos/Asset.types";
import AddToSaved from "./AddToSaved";

interface Props {
  asset: IAsset;
}

export default function AssetShowcase({ asset }: Props) {
  // active image state
  const [activeImage, setActiveImage] = useState(0);

  // next image in slider
  // const nextImage = () => {
  //   if (activeImage !== asset.images.length - 1) {
  //     setActiveImage((prev) => prev + 1);
  //   } else {
  //     setActiveImage(0);
  //   }
  // };

  // previous image in slider
  // const previousImage = () => {
  //   if (activeImage !== 0) {
  //     setActiveImage((prev) => prev - 1);
  //   } else {
  //     setActiveImage(asset.images.length - 1);
  //   }
  // };

  return (
    <FadeIn delay={0.1} className="flex flex-col gap-4">
      <div className="relative w-full md:w-[600px] lg:w-[400px] xl:w-[600px]">
        <Image
          key={asset.thumbnail.imageId}
          src={getAssetImage(asset.assetId, asset.images[activeImage].imageId)}
          alt={asset.thumbnail.alt}
          width={600}
          height={0}
          className="w-full md:w-[600px] lg:w-[400px] xl:w-[600px] rounded-lg"
        />
        <AddToSaved asset={asset} />
      </div>

      <div className="flex items-center justify-between gap-8 w-full md:w-[600px] lg:w-[400px] xl:w-[600px]">
        {/* <RoundedButton
          icon="CaretLeft"
          colorType="secondary"
          onClick={previousImage}
        /> */}

        <div className="grid grid-flow-row grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
          {asset.images.map((image, index) => (
            <Image
              key={image.imageId}
              src={getAssetImage(asset.assetId, image.imageId)}
              alt={image.alt}
              width={80}
              height={0}
              onClick={() => setActiveImage(index)}
              className={cn(
                "w-full rounded-lg transition-all cursor-pointer",
                activeImage === index
                  ? "border-[3px] border-transparent outline outline-[3px] outline-green-primary"
                  : ""
              )}
            />
          ))}
        </div>

        {/* <RoundedButton
          icon="CaretRight"
          colorType="secondary"
          onClick={nextImage}
        /> */}
      </div>
    </FadeIn>
  );
}
