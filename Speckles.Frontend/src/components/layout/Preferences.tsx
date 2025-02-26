import { useCurrenciesQuery } from "@/hooks/useApi";
import Input, { SelectOption } from "../forms/Input";
import PopupTooltip from "../shared/PopupTooltip";
import RoundedButton from "../shared/RoundedButton";
import { ChangeEvent, useState } from "react";
import useCurrencyStore from "@/stores/useCurrencyStore";

export default function Preferences() {
  // currencies query
  const currenciesQuery = useCurrenciesQuery();
  const currencies = currenciesQuery.data?.data ?? [];

  // format currencies
  const options: SelectOption[] = currencies.map((currency) => ({
    label: currency.name,
    value: currency.name,
  }));

  // currency state
  const currencyStore = useCurrencyStore();
  const [currency, setCurrency] = useState(currencyStore.localCurrency);

  // on change
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    currencyStore.setLocalCurrency(e.target.value);
  };

  return (
    <div className="fixed bottom-8 right-8">
      <PopupTooltip
        button={<RoundedButton icon="CurrencyDollarSimple" />}
        anchor="top end"
      >
        <div className="flex flex-col gap-8 p-6 w-72">
          <Input
            title="Currency"
            type="select"
            name="Currency"
            placeholder="Select a currency"
            onChange={onChange}
            onBlur={() => {}}
            value={currency}
            error={undefined}
            touched={false}
            options={options}
          />

          {/* <Input
            title="Language"
            type="select"
            name="Language"
            placeholder="Select a language"
            onChange={() => {}}
            onBlur={() => {}}
            value=""
            error=""
            touched={false}
            options={[]}
          /> */}
        </div>
      </PopupTooltip>
    </div>
  );
}
