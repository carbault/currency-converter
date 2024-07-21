import { CurrencyType } from "@currency-converter/types";
import { useMemo, useState } from "react";
import { CheckBox } from "./components/CheckBox";
import { DropdownOption } from "./components/DropdownOption";
import { Select } from "./components/Select";
import useAvailableCurrencies from "./query/useAvailableCurrencies";

export default function CurrencySelect(props: {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder: string;
}) {
  const { value, onChange, placeholder } = props;

  const [currencyType, setCurrencyType] = useState<CurrencyType>();

  const { data: currencies = [], isLoading } =
    useAvailableCurrencies(currencyType);

  const currencyOptions = useMemo(
    () =>
      currencies.map((currency) => ({
        value: currency.code,
        label: `${currency.name} (${currency.symbol ?? currency.code})`,
      })),
    [currencies]
  );

  const toggleCurrencyType = (newCurrencyType: CurrencyType) => () => {
    setCurrencyType(
      currencyType === newCurrencyType ? undefined : newCurrencyType
    );
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      items={currencyOptions}
      className="w-1/2 max-w-[1/2]"
      isLoading={isLoading}
      text={
        currencies.find((currency) => currency.code === value)?.name ??
        placeholder
      }
    >
      <DropdownOption
        onClick={toggleCurrencyType("classic")}
        isSelected={currencyType === "classic"}
      >
        <CheckBox
          checked={currencyType === "classic"}
          onChange={(e) => e.stopPropagation()}
        />
        Only classic currencies
      </DropdownOption>
      <DropdownOption
        onClick={toggleCurrencyType("crypto")}
        isSelected={currencyType === "crypto"}
      >
        <CheckBox
          checked={currencyType === "crypto"}
          onChange={(e) => e.stopPropagation()}
        />
        Only crypto currencies
      </DropdownOption>
      <div
        role="separator"
        className="flex-shrink-0 bg-gray-300 my-2 h-px min-h-px w-full"
      />
    </Select>
  );
}
