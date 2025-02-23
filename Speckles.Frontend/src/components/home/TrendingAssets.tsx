import FadeIn from "../animation/FadeIn";
import Section from "../shared/Section";
import RoundedButton from "../shared/RoundedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import AssetItem from "../asset/AssetItem";
import { useAssetsQuery } from "@/hooks/useApi";

import "swiper/css";
import "swiper/css/navigation";
import AssetList from "../asset/AssetList";
import { gridCardDelay } from "../shared/GridCard";

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
          {assetsQuery.isSuccess ? (
            assets.map((asset, index) => (
              <SwiperSlide key={`asset_${asset.assetId}`}>
                <FadeIn delay={gridCardDelay(0.2, index)}>
                  <AssetItem asset={asset} />
                </FadeIn>
              </SwiperSlide>
            ))
          ) : (
            <AssetList delay={0.2} skeleton />
          )}
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
