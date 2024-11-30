import { IAssetShort } from "@/types/Asset.types";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import Section from "../common/Section";
import { fetchAssets } from "@/utils/fetchers";
import RoundedButton from "../common/RoundedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import Asset, { SkeletonAsset } from "../asset/Asset";

import "swiper/css";
import "swiper/css/navigation";

export default function HomeAssets() {
  return (
    <FadeIn delay={0.2}>
      <Section title="For you" />
      <HomeAssetList />
    </FadeIn>
  );
}

function HomeAssetList() {
  const assetQuery = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  const assets = assetQuery.data?.data as IAssetShort[];

  return (
    <div className="flex flex-col gap-6">
      <Swiper
        loop
        keyboard={{ enabled: true }}
        slidesPerView={3}
        spaceBetween={24}
        navigation={{
          prevEl: ".carousel-previous",
          nextEl: ".carousel-next",
        }}
        modules={[Navigation, Keyboard, Mousewheel]}
        className="rounded-lg w-full"
        // pagination={{ clickable: true, dynamicBullets: true }}
      >
        {assetQuery.isSuccess
          ? assets.map((asset) => (
              <SwiperSlide key={`asset_${asset.assetId}`}>
                <Asset asset={asset} />
              </SwiperSlide>
            ))
          : Array(3)
              .fill(" ")
              .map((_, index) => (
                <SwiperSlide key={`skeleton_asset_${index}`}>
                  <FadeIn
                    delay={0.2 + index * 0.05}
                    className="relative rounded-lg overflow-hidden group aspect-w-16 aspect-h-10 bg-neutral-300"
                  >
                    <SkeletonAsset />
                  </FadeIn>
                </SwiperSlide>
              ))}
      </Swiper>

      <FadeIn delay={0.4} className="flex gap-4 justify-end">
        <div className="carousel-previous">
          <RoundedButton icon="CaretLeft" />
        </div>

        <div className="carousel-next">
          <RoundedButton icon="CaretRight" />
        </div>
      </FadeIn>
    </div>
  );
}
