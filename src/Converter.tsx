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

const roundValue = (num: number) => Math.round(num * 1000) / 1000;

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
            value={baseValue === 0 ? "" : roundValue(baseValue)}
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
            value={baseValue === 0 ? "" : roundValue(baseValue * exchangeRate)}
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
      fetch(API(baseCurrency, targetCurrency))
        .then((res) => res.json())
        .then((data) => {
          setExchangeRate(
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
