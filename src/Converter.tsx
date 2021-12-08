import {
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import currencyCodes from "./currencyCodes";

const API_KEY = "ME4N1I6UO04FTYAE";
const API = (baseCurrency: string, targetCurrency: string) =>
  `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=${targetCurrency}&apikey=${API_KEY}`;

export default function Converter() {
  const {
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
    exchangeRate,
  } = useCurrencyExchange();
  // input values
  const [baseValue, setBaseValue] = useState<number>(0);
  return (
    <Center>
      <Flex
        justifyContent="center"
        margin="2rem"
        alignItems="baseline"
        width="60%"
      >
        <Select
          placeholder="Select currency"
          size="lg"
          m=".5rem"
          value={baseCurrency}
          onChange={(e) => {
            setBaseCurrency(e.target.value);
          }}
        >
          {Object.keys(currencyCodes).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCodes[currencyCode].name} ({currencyCode})
            </option>
          ))}
        </Select>
        <InputGroup m=".5rem">
          {baseCurrency && (
            <InputLeftElement>
              {currencyCodes[baseCurrency].symbolNative}
            </InputLeftElement>
          )}
          <Input
            type="number"
            disabled={exchangeRate === 0}
            value={baseValue === 0 ? "" : baseValue}
            onChange={(e) => {
              setBaseValue(Number(e.target.value));
            }}
          />
        </InputGroup>
        <Heading as="h2" m=".5rem">
          =
        </Heading>
        <InputGroup m=".5rem">
          {targetCurrency && (
            <InputLeftElement>
              {currencyCodes[targetCurrency].symbolNative}
            </InputLeftElement>
          )}
          <Input
            type="number"
            disabled={exchangeRate === 0}
            value={baseValue === 0 ? "" : baseValue * exchangeRate}
            onChange={(e) => {
              if (exchangeRate !== 0) {
                setBaseValue(Number(e.target.value) / exchangeRate);
              }
            }}
          />
        </InputGroup>
        <Select
          placeholder="Select Currency"
          size="lg"
          m=".5rem"
          value={targetCurrency}
          onChange={(e) => {
            setTargetCurrency(e.target.value);
          }}
        >
          {Object.keys(currencyCodes).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCodes[currencyCode].name} ({currencyCode})
            </option>
          ))}
        </Select>
      </Flex>
    </Center>
  );
}

function useCurrencyExchange() {
  // Currency id
  const [baseCurrency, setBaseCurrency] = useState<string>("");
  const [targetCurrency, setTargetCurrency] = useState<string>("");

  //exchange rates fetched from API
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      setExchangeRate(0);
      // setTargetCurrencyRate(1.5);
      fetch(API(baseCurrency, targetCurrency))
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setExchangeRate(
            Number(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
          );
          console.log(
            "rate",
            Number(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
          );
        });
    }
  }, [baseCurrency, targetCurrency]);

  return {
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
    exchangeRate,
  };
}
/**
*
  {"Realtime Currency Exchange Rate":{"1. From_Currency Code":"USD","2. From_Currency Name":"United States Dollar","3. To_Currency Code":"JPY","4. To_Currency Name":"Japanese Yen","5. Exchange Rate":"113.16800000","6. Last Refreshed":"2021-11-30 19:26:44","7. Time Zone":"UTC","8. Bid Price":"113.16290000","9. Ask Price":"113.17360000"}}
    */
