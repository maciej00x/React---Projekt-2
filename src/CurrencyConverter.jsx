import React, { useState } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(amount) || amount === 0) {
      setError("Proszę wpisać kwotę większą od 0");
      setResult(null);
      return;
    }

    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Wystąpił błąd przy pobieraniu danych");
        }
        return response.json();
      })
      .then((data) => {
        const rate = data.rates[0].mid;
        const convertedAmount = (amount * rate).toFixed(2);
        const rateText = `Kurs: 1 ${currency} = ${rate} PLN`;
        setResult(
          `Przeliczona kwota: ${amount} ${currency} wynosi ${convertedAmount} PLN. ${rateText}`
        );
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Wystąpił błąd przy przeliczaniu walut");
        setResult(null);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="EUR">EURO</option>
          <option value="USD">USD</option>
          <option value="CHF">CHF</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Kwota (PLN)"
          min="0.01"
          step="0.01"
          required
        />
      </div>
      <button type="submit">Przelicz</button>
      {error && <p>{error}</p>}
      {result && <p>{result}</p>}
    </form>
  );
}

export default CurrencyConverter;
