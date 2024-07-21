import { z } from "zod";

export type CurrencyType = "classic" | "crypto";

export type Currency = {
  name: string;
  code: string;
  symbol?: string;
  type: CurrencyType;
};

export const conversionSchema = z.object({
  from: z.string(),
  to: z.string(),
  value: z.number(),
});

export const currenciesSchema = z.object({
  type: z.enum(["classic", "crypto"]).optional(),
});

export type ConversionParams = z.infer<typeof conversionSchema>;
export type CurrenciesParams = z.infer<typeof currenciesSchema>;
