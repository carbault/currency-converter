import { useMemo, useState } from "react";
import "./App.css";
import { NumberInput } from "./components/NumberInput";
import { Select } from "./components/Select";
import { Spinner } from "./components/Spinner";
import useAvailableCurrencies from "./query/useAvailableCurrencies";
import useConvertCurrency from "./query/useConvertCurrencies";

export default function App() {
  const [baseValue, setBaseValue] = useState<number>();
  const [targetValue, setTargetValue] = useState<number>();
  const [baseCurrency, setBaseCurrency] = useState<string>();
  const [targetCurrency, setTargetCurrency] = useState<string>();

  const { data: currencies = [] } = useAvailableCurrencies();
  const { mutate: convertCurrency, isPending } = useConvertCurrency();

  const currencyOptions = useMemo(
    () =>
      currencies.map((currency) => ({
        value: currency.code,
        label: `${currency.name} (${currency.symbol ?? currency.code})`,
      })),
    [currencies]
  );

  const resetValues = () => {
    setBaseValue(undefined);
    setTargetValue(undefined);
  };

  const handleSetBaseValue = (newValue?: number) => {
    if (!baseCurrency || !targetCurrency) {
      return;
    }
    if (newValue === undefined) {
      resetValues();
      return;
    }
    setBaseValue(newValue);
    convertCurrency(
      {
        from: baseCurrency,
        to: targetCurrency,
        value: newValue,
      },
      { onSuccess: (convertedValue) => setTargetValue(convertedValue) }
    );
  };

  const handleSetTargetValue = (newValue?: number) => {
    if (!baseCurrency || !targetCurrency) {
      return;
    }
    if (newValue === undefined) {
      resetValues();
      return;
    }
    setTargetValue(newValue);
    convertCurrency(
      {
        from: targetCurrency,
        to: baseCurrency,
        value: newValue,
      },
      { onSuccess: (convertedValue) => setBaseValue(convertedValue) }
    );
  };

  return (
    <div className="w-full h-full flex bg-gray-50">
      <div className="bg-white w-1/3 p-4 mt-auto rounded-lg my-auto mx-auto min-w-72 items-center justify-center flex flex-col gap-6 border shadow-sm relative">
        <h1 className="uppercase py-2 text-2xl font-bold tracking-tight text-sky-500">
          Convert a currency
        </h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 items-center">
            <Select
              value={baseCurrency}
              onChange={setBaseCurrency}
              items={currencyOptions}
              className="w-1/2 max-w-[1/2]"
            >
              {currencies.find((currency) => currency.code === baseCurrency)
                ?.name ?? "From"}
            </Select>
            <NumberInput
              value={baseValue}
              onSubmit={handleSetBaseValue}
              className="w-1/2"
              disabled={isPending}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Select
              value={targetCurrency}
              onChange={setTargetCurrency}
              items={currencyOptions}
              className="w-1/2 max-w-[1/2]"
            >
              {currencies.find((currency) => currency.code === targetCurrency)
                ?.name ?? "To"}
            </Select>
            <NumberInput
              value={targetValue}
              onSubmit={handleSetTargetValue}
              className="w-1/2"
              disabled={isPending}
            />
          </div>
        </div>
        {isPending && (
          <div className="bg-sky-200 opacity-20 flex absolute top-0 left-0 h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
