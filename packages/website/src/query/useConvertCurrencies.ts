import { ConversionParams } from "@currency-converter/types";
import { useMutation } from "@tanstack/react-query";
import { responseOrError } from "./utils";

export const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://localhost:3000";

export default function useConvertCurrency() {
  return useMutation({
    mutationFn: async (params: ConversionParams) => {
      const response = await fetch(`${BACKEND_URL}/convert`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
      }).then((response) => responseOrError(response));
      const convertedValue: number = await response.json();
      return convertedValue;
    },
  });
}
