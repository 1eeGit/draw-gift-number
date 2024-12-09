import React, { useState } from "react";
import "./App.css";

function App() {
  const [maxValue, setMaxValue] = useState(0);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [error, setError] = useState("");

  const initializeNumbers = () => {
    if (maxValue < 1) {
      setError("Please enter a valid number greater than 0.");
      return;
    }
    setError("");
    const numbers = Array.from({ length: maxValue }, (_, i) => i + 1);
    setAvailableNumbers(numbers);
    setDrawnNumbers([]);
  };

  const drawNumber = () => {
    if (availableNumbers.length === 0) {
      setError("All numbers have been drawn.");
      return;
    }
    setError("");
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[randomIndex];
    setAvailableNumbers(availableNumbers.filter((_, i) => i !== randomIndex));
    setDrawnNumbers([...drawnNumbers, number]);
  };

  const redrawNumber = () => {
    if (drawnNumbers.length === 0) {
      setError("No numbers to redraw.");
      return;
    }
    setError("");
    const lastDrawnNumber = drawnNumbers[drawnNumbers.length - 1];
    setDrawnNumbers(drawnNumbers.slice(0, -1));
    setAvailableNumbers([...availableNumbers, lastDrawnNumber]);
  };

  return (
    <div className="App">
      <h1>🎅 Draw Gift Number 🎄</h1>
      <div>
        <label>Enter Maximum Number: </label>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />
        <button onClick={initializeNumbers}>Initialize</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button onClick={drawNumber} disabled={availableNumbers.length === 0}>
          Draw Number
        </button>
        <button onClick={redrawNumber} disabled={drawnNumbers.length === 0}>
          Redraw
        </button>
      </div>
      <h2>Drawn Numbers:</h2>
      <div className="numbers">
        {drawnNumbers.length === 0 ? (
          <p>No numbers drawn yet.</p>
        ) : (
          drawnNumbers.map((num, index) => (
            <div key={index} className="number-ball">
              {num}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
