import React, { useState, useEffect, useCallback } from "react";
import ResultCard from "./ResultCard";

const ConverterForm = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const convertCurrency = useCallback(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;

    const rate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = amount * rate;

    setResult({
      rate: rate,
      result: convertedAmount,
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
  }, [amount, fromCurrency, toCurrency, rates]);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, rates, convertCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="main-card fade-in fade-in-2">
      <div className="currency-form">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <div className="input-field">
            <input
              id="amount"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="from">From</label>
          <div className="custom-select">
            <select
              id="from"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>

        <button className="swap-btn" onClick={swapCurrencies}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M16 3H21V8" />
            <path d="M4 20L21 3" />
            <path d="M8 21H3V16" />
          </svg>
        </button>

        <div className="form-group">
          <label htmlFor="to">To</label>
          <div className="custom-select">
            <select
              id="to"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - US Dollar</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {result && (
        <ResultCard
          rate={result.rate}
          amount={result.amount}
          from={result.from}
          to={result.to}
          result={result.result}
        />
      )}
    </div>
  );
};

export default ConverterForm;
