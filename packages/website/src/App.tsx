import { useMemo, useState } from "react";
import "./App.css";
import { NumberInput } from "./components/NumberInput";
import { Select } from "./components/Select";
import { Spinner } from "./components/Spinner";
import useAvailableCurrencies from "./query/useAvailableCurrencies";
import useConvertCurrency from "./query/useConvertCurrencies";

type CurrencyValues = { base?: number; target?: number };

export default function App() {
  const [baseCurrency, setBaseCurrency] = useState<string>();
  const [targetCurrency, setTargetCurrency] = useState<string>();
  const [values, setValues] = useState<CurrencyValues>({});

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

  const handleSetBaseCurrency = (currency: string | undefined) => {
    setBaseCurrency(currency);
    if (targetCurrency && (values.base || values.target)) {
      handleConvertCurrency(
        values.base ? "base" : "target",
        values.base ?? values.target
      );
    }
  };

  const handleSetTargetCurrency = (currency: string | undefined) => {
    setTargetCurrency(currency);
    if (baseCurrency && (values.base || values.target)) {
      handleConvertCurrency(
        values.base ? "base" : "target",
        values.base ?? values.target
      );
    }
  };

  const handleSetValue =
    (convertedCurrency: keyof CurrencyValues) =>
    (newValue: number | undefined) => {
      // reset values
      if (!newValue) {
        setValues({});
        return;
      }
      setValues({ [convertedCurrency]: newValue });
      handleConvertCurrency(convertedCurrency, newValue);
    };

  const handleConvertCurrency = (
    convertedCurrency: keyof CurrencyValues,
    value: number = 0
  ) => {
    if (baseCurrency && targetCurrency) {
      convertCurrency(
        {
          value,
          from: convertedCurrency === "base" ? baseCurrency : targetCurrency,
          to: convertedCurrency === "base" ? targetCurrency : baseCurrency,
        },
        {
          onSuccess: (convertedValue) =>
            setValues({
              // set opposite currency to converted value:
              [convertedCurrency]: value,
              [convertedCurrency === "base" ? "target" : "base"]:
                convertedValue,
            }),
        }
      );
    }
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
              onChange={handleSetBaseCurrency}
              items={currencyOptions}
              className="w-1/2 max-w-[1/2]"
            >
              {currencies.find((currency) => currency.code === baseCurrency)
                ?.name ?? "From"}
            </Select>
            <NumberInput
              value={values.base}
              onSubmit={handleSetValue("base")}
              className="w-1/2"
              disabled={isPending}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Select
              value={targetCurrency}
              onChange={handleSetTargetCurrency}
              items={currencyOptions}
              className="w-1/2 max-w-[1/2]"
            >
              {currencies.find((currency) => currency.code === targetCurrency)
                ?.name ?? "To"}
            </Select>
            <NumberInput
              value={values.target}
              onSubmit={handleSetValue("target")}
              className="w-1/2"
              disabled={isPending}
            />
          </div>
        </div>
        {/* Overlay */}
        {isPending && (
          <div className="bg-sky-200 opacity-20 flex absolute top-0 left-0 h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
