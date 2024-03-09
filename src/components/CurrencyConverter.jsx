import { useState } from "react";

function CurrencyConverter() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const currency = event.target.currency.value;

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
          setError("Wystąpił błąd przy pobieraniu danych");
          setResult(null);
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
        <select name="currency">
          <option value="EUR">EURO</option>
          <option value="USD">USD</option>
          <option value="CHF">CHF</option>
        </select>
      </div>
      <div>
        <input
          name="amount"
          type="number"
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