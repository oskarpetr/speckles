import { ICurrency } from "@/types/dtos/Currency.types";
import { fetchCurrencyRates } from "@/utils/fetchers";
import { formatPrice, formatPriceToLocal } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import Tooltip from "../shared/Tooltip";
import Icon from "../shared/Icon";
import { IRates } from "@/types/dtos/Rates.types";

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
  });

  // rates
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
