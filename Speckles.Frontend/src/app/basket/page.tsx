"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { Fragment } from "react";
import { DownloadSimple, FileText } from "@phosphor-icons/react";
import { getAssetImage } from "@/utils/images";
import Section from "@/components/shared/Section";
import FadeIn from "@/components/animation/FadeIn";
import { getAssetThumbnailAlt } from "@/utils/alts";
import LayoutSection from "@/components/layout/LayoutSection";
import AssetPrice from "@/components/asset/AssetPrice";
import { useBasketQuery } from "@/hooks/useApi";
import { gridCardDelay } from "@/components/shared/GridCard";

export default function BasketPage() {
  // fetch basket
  const basketQuery = useBasketQuery();
  const basket = basketQuery.data?.data ?? [];

  return (
    <Layout>
      <LayoutSection>
        <Heading title="Basket" />

        {basketQuery.isSuccess && (
          <div className="flex gap-16">
            <Section title="Assets" delay={0.1}>
              <div className="flex flex-col gap-6 h-fit bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
                {basket.map((asset, index) => (
                  <Fragment key={`asset_${asset.assetId}`}>
                    <FadeIn
                      delay={gridCardDelay(0.2, index)}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={getAssetImage(
                            asset.assetId,
                            asset.thumbnail.imageId
                          )}
                          alt={getAssetThumbnailAlt(asset.name)}
                          width={256}
                          height={0}
                          className="w-32 rounded-lg"
                        />

                        <div>
                          <div className="font-bold text-lg">{asset.name}</div>
                          <div className="opacity-50">{asset.name}</div>
                        </div>

                        <div>
                          <div className="font-bold text-lg">Price</div>
                          <AssetPrice
                            price={asset.price}
                            currency={asset.currency}
                            color="black"
                          />
                        </div>
                      </div>
                    </FadeIn>

                    {index !== basket.length - 1 && (
                      <FadeIn delay={gridCardDelay(0.2, index)}>
                        <div className="border-b border-black-primary border-opacity-10"></div>
                      </FadeIn>
                    )}
                  </Fragment>
                ))}
              </div>
            </Section>

            <Section title="Order summary" delay={0.2}>
              <div className="flex flex-col gap-6 bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
                <div className="flex flex-col gap-2">
                  {/* <div className="flex justify-between">
                <div>Order date</div>
                <div>{formatDate(order.date)}</div>
              </div>

              <div className="flex justify-between">
                <div>Amount paid</div>
                <div>
                  {formatPrice(order.asset.price, order.asset.currency)}
                </div>
              </div>

              <div className="flex justify-between">
                <div>Payment method</div>
                <div>{order.paymentMethod}</div>
              </div> */}
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <button
                    className={
                      "bg-green-primary bg-opacity-10 hover:bg-opacity-20 border border-black-primary border-opacity-10 flex items-center justify-center gap-2 w-full rounded-lg py-[calc(1rem-1px)] text-green-primary font-bold transition-colors"
                    }
                  >
                    <FileText size={24} />
                    View Invoice
                  </button>

                  <button
                    className={
                      "bg-green-primary hover:bg-green-primary-hover flex items-center justify-center gap-2 w-full rounded-lg py-4 text-white font-bold transition-colors"
                    }
                  >
                    <DownloadSimple size={24} />
                    Download All
                  </button>
                </div>
              </div>
            </Section>
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}
