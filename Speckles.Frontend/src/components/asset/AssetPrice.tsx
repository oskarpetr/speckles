import { formatPrice, formatPriceToLocal } from "@/utils/formatters";
import Tooltip from "../shared/Tooltip";
import Icon from "../shared/Icon";
import { IRates } from "@/types/dtos/Rates.types";
import { useRatesQuery } from "@/hooks/useApi";

interface Props {
  price: number;
  currencyName: string;
  currencyLocale?: string;
  color: "white" | "black";
  showOriginal?: boolean;
}

export default function AssetPrice({
  price,
  currencyName,
  currencyLocale,
  color,
  showOriginal = false,
}: Props) {
  // fetch rates
  const currencyRatesQuery = useRatesQuery(currencyName);
  const rates = currencyRatesQuery?.data as IRates;

  console.log(rates);
  // prices
  const convertedPrice = formatPriceToLocal(price, rates?.rates ?? {});

  return (
    currencyRatesQuery.isSuccess && (
      <div className="flex items-center gap-2">
        <div className={color === "black" ? "text-black" : "text-white"}>
          {convertedPrice}
        </div>

        {showOriginal && currencyLocale && (
          <AssetPriceOriginal
            price={price}
            currencyName={currencyName}
            currencyLocale={currencyLocale}
          />
        )}
      </div>
    )
  );
}

interface OriginalProps {
  price: number;
  currencyName: string;
  currencyLocale: string;
}

function AssetPriceOriginal({
  price,
  currencyName,
  currencyLocale,
}: OriginalProps) {
  // formatted price
  const formattedPrice = formatPrice(currencyLocale, currencyName, price);

  return (
    <div className="flex items-center gap-1">
      <div className="text-sm opacity-50">Converted from {formattedPrice}</div>

      <Tooltip direction="bottom" text="From ExchangeRate">
        <Icon name="Info" size={18} className="cursor-pointer opacity-50" />
      </Tooltip>
    </div>
  );
}
