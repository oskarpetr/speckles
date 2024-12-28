import { ICurrency } from "@/types/dtos/Currency.types";
import { fetchCurrencyRates } from "@/utils/fetchers";
import { formatPrice } from "@/utils/formatters";
import { formatPriceToLocal } from "@/utils/price";
import { useQuery } from "@tanstack/react-query";
import Tooltip from "../shared/Tooltip";
import Icon from "../shared/Icon";
import { IRates } from "@/types/dtos/Rates.types";

// base currency
export const BASE_CURRENCY = "EUR";

interface Props {
  price: number;
  currency: ICurrency;
  color: "white" | "black";
  showOriginal?: boolean;
}

export default function AssetPrice({
  price,
  currency,
  color,
  showOriginal = false,
}: Props) {
  const currencyRatesQuery = useQuery<IRates>({
    queryKey: ["currency", currency],
    queryFn: () => fetchCurrencyRates(currency.name),
    enabled: showOriginal,
  });

  const rates = currencyRatesQuery?.data as IRates;
  const formattedPrice = formatPrice(currency.locale, currency.name, price);

  return (
    currencyRatesQuery.isSuccess && (
      <div className="flex items-center gap-2">
        <div className={color === "black" ? "text-black" : "text-white"}>
          {formatPriceToLocal(price, rates.rates)}
        </div>

        {showOriginal && (
          <div className="flex items-center gap-1">
            <div className="text-sm opacity-50">
              Converted from {formattedPrice}
            </div>

            <Tooltip direction="bottom" text="Conversions from CEB">
              <Icon
                name="Info"
                size={18}
                className="cursor-pointer opacity-50"
              />
            </Tooltip>
          </div>
        )}
      </div>
    )
  );
}
