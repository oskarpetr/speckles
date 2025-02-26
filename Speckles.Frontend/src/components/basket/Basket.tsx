import { Fragment, useEffect } from "react";
import Section from "../shared/Section";
import BasketItem from "./BasketItem";
import NoItemsYet from "../shared/NoItemsYet";
import { formatPrice } from "@/utils/formatters";
import { useBasketTotalPriceQuery } from "@/hooks/useApi";
import { IAssetShort } from "@/types/dtos/Asset.types";
import GrayCard from "../shared/GrayCard";
import { GrayCardItem } from "../shared/GrayCardItem";
import Separator from "../shared/Separator";
import PaymentButton from "./PaymentButton";
import useCurrencyStore from "@/stores/useCurrencyStore";

interface Props {
  basket: IAssetShort[];
}

export default function Basket({ basket }: Props) {
  // total price
  const locale = navigator.language;
  const currencyStore = useCurrencyStore();

  // basket total price
  const basketTotalPriceQuery = useBasketTotalPriceQuery(
    basket,
    currencyStore.localCurrency
  );
  const totalPrice = basketTotalPriceQuery.data ?? 0;
  const totalPriceFormatted = formatPrice(
    locale,
    currencyStore.localCurrency,
    totalPrice
  );

  useEffect(() => {
    basketTotalPriceQuery.refetch();
  }, [basket]);

  return (
    <div className="flex gap-16">
      <Section title="Assets in basket" delay={0.1} className="w-2/3">
        <GrayCard>
          {basket.length > 0 ? (
            <table className="border-separate w-full">
              <tbody>
                {basket.map((asset, index) => (
                  <Fragment key={`asset_${asset.assetId}`}>
                    <BasketItem asset={asset} />

                    {index !== basket.length - 1 && (
                      <tr>
                        <td colSpan={4}>
                          <div className="my-6">
                            <Separator />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <NoItemsYet items="items" />
          )}
        </GrayCard>
      </Section>

      <Section title="Order summary" delay={0.2} className="w-1/3">
        <GrayCard>
          {basket.length > 0 ? (
            <Fragment>
              <div className="flex flex-col gap-2">
                <GrayCardItem
                  property="Total price"
                  value={totalPriceFormatted}
                />
                <GrayCardItem property="Payment method" value="PayPal" />
              </div>

              <PaymentButton
                basket={basket}
                currencyName={currencyStore.localCurrency}
                totalPrice={totalPrice}
              />
            </Fragment>
          ) : (
            <NoItemsYet items="order" />
          )}
        </GrayCard>
      </Section>
    </div>
  );
}
