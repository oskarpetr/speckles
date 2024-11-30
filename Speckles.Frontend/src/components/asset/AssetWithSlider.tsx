import Image from "next/image";
import FadeIn from "../animation/FadeIn";
import { motion, useAnimationControls } from "framer-motion";
import { getAssetImage } from "@/utils/images";
import { IAsset } from "@/types/Asset.types";
import { useContext, useEffect, useState } from "react";
import { BEZIER_CURVE } from "@/utils/animation";
import { Heart } from "@phosphor-icons/react";
import RoundedButton from "../common/RoundedButton";
import { cn } from "@/utils/cn";
import { MenuContext } from "../context/MenuContext";
import Like from "../common/Like";

interface Props {
  asset: IAsset;
}

export default function AssetWithSlider({ asset }: Props) {
  // menu context
  const menuContext = useContext(MenuContext);
  const { savedCountQuery, postSavedQuery, setSavedType } = menuContext;

  // active image state
  const [activeImage, setActiveImage] = useState(0);

  // saved asset state
  const [savedAsset, setSavedAsset] = useState(asset.saved);

  // toggle save asset
  const toggleSaveAsset = async () => {
    await postSavedQuery?.refetch();
    await savedCountQuery?.refetch();

    setSavedType((prev) => (prev === "add" ? "remove" : "add"));
  };

  // next image in slider
  const nextImage = () => {
    if (activeImage !== asset.images.length - 1) {
      setActiveImage((prev) => prev + 1);
    } else {
      setActiveImage(0);
    }
  };

  // previous image in slider
  const previousImage = () => {
    if (activeImage !== 0) {
      setActiveImage((prev) => prev - 1);
    } else {
      setActiveImage(asset.images.length - 1);
    }
  };

  useEffect(() => {
    setSavedType(asset.saved ? "remove" : "add");
  }, []);

  return (
    <FadeIn delay={0.1} className="flex flex-col gap-4 relative">
      <Image
        key={asset.thumbnail.imageId}
        src={getAssetImage(asset.assetId, asset.images[activeImage].imageId)}
        alt={asset.thumbnail.alt}
        width={600}
        height={0}
        className="rounded-lg"
      />

      <button
        onClick={toggleSaveAsset}
        className="absolute top-8 right-8 drop-shadow-2xl p-3 rounded-full bg-black bg-opacity-40 backdrop-blur-xl"
      >
        <Like
          liked={savedAsset}
          setLiked={setSavedAsset}
          iconSize="big"
          color="white"
        />
      </button>

      <div className="flex items-center justify-between gap-8">
        <RoundedButton
          icon="CaretLeft"
          colorType="secondary"
          onClick={previousImage}
        />

        <div className="flex gap-4 w-full">
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

        <RoundedButton
          icon="CaretRight"
          colorType="secondary"
          onClick={nextImage}
        />
      </div>
    </FadeIn>
  );
}
