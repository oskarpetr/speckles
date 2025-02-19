"use client";

import Heading from "@/components/shared/Heading";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { getAssetImage } from "@/utils/images";
import Section from "@/components/shared/Section";
import { getAssetThumbnailAlt } from "@/utils/alts";
import LayoutSection from "@/components/layout/LayoutSection";
import AssetPrice from "@/components/asset/AssetPrice";
import {
  useBasketMutation,
  useBasketQuery,
  useRatesQuery,
} from "@/hooks/useApi";
import { IAssetShort } from "@/types/dtos/Asset.types";
import Link from "next/link";
import RoundedButton from "@/components/shared/RoundedButton";
import Button from "@/components/shared/Button";
import { getLocalCurrency } from "@/utils/local";
import { formatPrice } from "@/utils/formatters";
import { BASE_CURRENCY } from "@/utils/price";
import { getTotalPrice } from "@/utils/currency";

export default function BasketPage() {
  // fetch basket
  const basketQuery = useBasketQuery();
  const basket = basketQuery.data?.data ?? [];

  // basket items
  const [items, setItems] = useState(basket);

  // total price
  const locale = navigator.language;
  const localCurrency = getLocalCurrency();

  // total price
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetctTotalPrice = async () => {
      if (basket) {
        const price = await getTotalPrice(basket, localCurrency);
        setTotalPrice(price);
      }
    };

    fetctTotalPrice();
  }, [basket]);

  useEffect(() => {
    setItems(basket);
  }, [basket]);

  return (
    <Layout>
      <LayoutSection>
        <Heading title="Basket" />

        {basketQuery.isSuccess && (
          <div className="flex gap-16">
            <Section title="Assets in basket" delay={0.1} className="w-2/3">
              <div className="border border-black-primary border-opacity-10 rounded-lg overflow-hidden">
                <table className="h-fit w-full bg-neutral-100 border-spacing-y-8 border-separate">
                  <tbody>
                    {basket.map((asset, index) => (
                      <Fragment key={`asset_${asset.assetId}`}>
                        <BasketItem asset={asset} setBasket={setItems} />

                        {index !== basket.length - 1 && (
                          <tr>
                            <td colSpan={4}>
                              <div className="border-b border-black-primary border-opacity-10 mx-8"></div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Order summary" delay={0.2} className="w-1/3">
              <div className="flex flex-col gap-6 bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>Total price</div>
                    {formatPrice(locale, localCurrency, totalPrice)}
                  </div>

                  <div className="flex justify-between">
                    <div>Payment method</div>
                    <div>PayPal</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <Button
                    text="Continue to payment"
                    icon={{ name: "ArrowRight" }}
                    fullWidth
                  />
                </div>
              </div>
            </Section>
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}

interface ItemProps {
  asset: IAssetShort;
  setBasket: Dispatch<SetStateAction<IAssetShort[]>>;
}

function BasketItem({ asset, setBasket }: ItemProps) {
  // basket mutation
  const basketMutation = useBasketMutation(asset.assetId, false);

  // on delete
  const onDelete = async () => {
    setBasket((prev) => prev.filter((x) => x.assetId !== asset.assetId));
    await basketMutation.mutateAsync();
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="pl-8 w-[calc(100%*2/9)]">
        <Link href={`/assets/${asset.assetId}`}>
          <Image
            src={getAssetImage(asset.assetId, asset.thumbnail.imageId)}
            alt={getAssetThumbnailAlt(asset.name)}
            width={256}
            height={0}
            className="w-44 rounded-lg"
          />
        </Link>
      </td>

      <td className="pl-8 w-[calc(100%*3/9)]">
        <div className="font-bold text-lg">{asset.name}</div>
        <div className="opacity-50">
          {asset.tags.map((x) => x.name).join(", ")}
        </div>
      </td>

      <td className="w-[calc(100%*3/9)]">
        <div className="font-bold text-lg">Price</div>
        <div className="opacity-50">
          <AssetPrice
            price={asset.price}
            currencyName={asset.currency.name}
            color="black"
          />
        </div>
      </td>

      <td className="pr-8 w-[calc(100%*1/9)]">
        <RoundedButton icon="X" colorType="secondary" onClick={onDelete} />
      </td>
    </tr>
  );
}
