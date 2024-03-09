import CurrencyConverter from "./components/CurrencyConverter";
import Result from "./components/Result";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="header">Przelicznik walut</h1>
      <CurrencyConverter />
      <Result />
    </div>
  );
}

export default App;
