import {
  ConversionParams,
  conversionSchema,
  CurrenciesParams,
  currenciesSchema,
  Currency,
} from "@currency-converter/types";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "./errorCodes";
import { validateRequestBody, validateRequestParams } from "./middleware";
import { SUPPORTED_CURRENCIES } from "./supportedCurrencies";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT ?? 3000;
const API_KEY = process.env.API_KEY ?? "";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  "/currencies",
  validateRequestParams(currenciesSchema),
  (request: Request<CurrenciesParams>, res: Response<Currency[]>) => {
    const { type } = request.params;
    res.json(
      type
        ? SUPPORTED_CURRENCIES.filter((currency) => currency.type === type)
        : SUPPORTED_CURRENCIES
    );
  }
);

app.post(
  "/convert",
  validateRequestBody(conversionSchema),
  async (
    request: Request<any, number, ConversionParams>,
    res: Response<number>
  ) => {
    const { from, to, value } = request.body;
    const conversionRate = await getCurrencyLatestRate(from, to, res);
    conversionRate && res.json(conversionRate * value);
  }
);

type CurrencyAPIResponse = {
  meta: { code: number };
  response: {
    date: string;
    base: string;
    rates: Record<string, number>;
  };
};

async function getCurrencyLatestRate(from: string, to: string, res: Response) {
  try {
    const response = await axios.get<CurrencyAPIResponse>(
      "https://api.currencybeacon.com/v1/latest/",
      {
        params: {
          base: from,
          symbols: to,
          api_key: API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response.rates[to];
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR);
    res.json("Could not fetch currency exchange rate");
  }
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
