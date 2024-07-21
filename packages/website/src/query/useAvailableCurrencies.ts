import { Currency, CurrencyType } from "@currency-converter/types";
import { useQuery } from "@tanstack/react-query";
import { responseOrError } from "./utils";

export const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://localhost:3000";

export default function useAvailableCurrencies(type?: CurrencyType) {
  return useQuery({
    queryFn: async () => {
      const response = await fetch(
        `${BACKEND_URL}/currencies${type ? `&type=${type}` : ""}`,
        { method: "GET" }
      ).then((response) => responseOrError(response));
      const currencies: Currency[] = await response.json();
      return currencies;
    },
    queryKey: ["available-currencies", type],
  });
}
