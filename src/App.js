import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Result from "./Result";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Przelicznik walut</h1>
      <CurrencyConverter />
    </div>
  );
}

export default App;
