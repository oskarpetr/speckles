import FadeIn from "../animation/FadeIn";
import Section from "../shared/Section";
import RoundedButton from "../shared/RoundedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import Asset, { SkeletonAssetItem } from "../asset/AssetItem";
import { useAssetsQuery } from "@/hooks/useApi";

import "swiper/css";
import "swiper/css/navigation";

export default function TrendingAssets() {
  // fetch assets
  const assetsQuery = useAssetsQuery();
  const assets = assetsQuery.data?.data ?? [];

  return (
    <Section title="Trending" delay={0.2}>
      <div className="flex flex-col gap-6">
        <Swiper
          loop
          keyboard={{ enabled: true }}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: ".carousel-previous",
            nextEl: ".carousel-next",
          }}
          modules={[Navigation, Keyboard, Mousewheel, Pagination]}
          className="rounded-lg w-full"
          // pagination={{ clickable: true, dynamicBullets: true }}
        >
          {assetsQuery.isSuccess
            ? assets.map((asset, index) => (
                <SwiperSlide key={`asset_${asset.assetId}`}>
                  <FadeIn delay={0.2 + index * 0.05}>
                    <Asset asset={asset} />
                  </FadeIn>
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
                      <SkeletonAssetItem />
                    </FadeIn>
                  </SwiperSlide>
                ))}
        </Swiper>

        <FadeIn delay={0.3} className="flex gap-4 justify-end">
          <div className="carousel-previous">
            <RoundedButton icon="CaretLeft" />
          </div>

          <div className="carousel-next">
            <RoundedButton icon="CaretRight" />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
