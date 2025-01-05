import { ICurrency } from "@/types/dtos/Currency.types";
import { formatPrice, formatPriceToLocal } from "@/utils/formatters";
import Tooltip from "../shared/Tooltip";
import Icon from "../shared/Icon";
import { IRates } from "@/types/dtos/Rates.types";
import { useRatesQuery } from "@/hooks/useApi";

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
  // fetch rates
  const currencyRatesQuery = useRatesQuery(currency.name);
  const rates = currencyRatesQuery?.data as IRates;

  // prices
  const convertedPrice = formatPriceToLocal(price, rates?.rates ?? {});
  const formattedPrice = formatPrice(currency.locale, currency.name, price);

  return (
    currencyRatesQuery.isSuccess && (
      <div className="flex items-center gap-2">
        <div className={color === "black" ? "text-black" : "text-white"}>
          {convertedPrice}
        </div>

        {showOriginal && (
          <div className="flex items-center gap-1">
            <div className="text-sm opacity-50">
              Converted from {formattedPrice}
            </div>

            <Tooltip direction="bottom" text="From ExchangeRate">
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
