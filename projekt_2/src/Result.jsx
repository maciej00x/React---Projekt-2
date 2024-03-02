import React from "react";

function Result({ convertedAmount, rate, currency }) {
  return (
    <div>
      <p>
        Przeliczona kwota: {convertedAmount} {currency} wynosi {convertedAmount}{" "}
        PLN. Kurs: 1 {currency} = {rate} PLN
      </p>
    </div>
  );
}

export default Result;
