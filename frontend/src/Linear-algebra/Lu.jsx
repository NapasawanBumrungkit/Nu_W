import { useState } from "react";

function Lu() {
  const [matrixSize, setMatrixSize] = useState(3);
  const [A, setA] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));
  const [b, setB] = useState(Array(3).fill(0));
  const [L, setL] = useState(null);
  const [U, setU] = useState(null);

  const handleAChange = (i, j, value) => {
    const newA = [...A];
    newA[i][j] = parseFloat(value);
    setA(newA);
  };

  const handleBChange = (i, value) => {
    const newB = [...b];
    newB[i] = parseFloat(value);
    setB(newB);
  };

  const handleCalculate = () => {
    // ใส่โค้ด LU Decomposition ที่นี่
    // ตัวอย่าง: setL(...) และ setU(...)
  };

  return (
    <div>
      <h1>LU Decomposition Methods</h1>
      <div>
        <label>Matrix Size: </label>
        <input type="number" value={matrixSize} onChange={(e) => setMatrixSize(parseInt(e.target.value))} />
      </div>
      <div>
        <h3>Matrix A:</h3>
        {A.map((row, i) => (
          <div key={i}>
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                value={val}
                onChange={(e) => handleAChange(i, j, e.target.value)}
                style={{ width: "50px", margin: "2px" }}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <h3>Vector b:</h3>
        {b.map((val, i) => (
          <input
            key={i}
            type="number"
            value={val}
            onChange={(e) => handleBChange(i, e.target.value)}
            style={{ width: "50px", margin: "2px" }}
          />
        ))}
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      {L && U && (
        <div>
          <h3>Matrix L:</h3>
          <pre>{JSON.stringify(L, null, 2)}</pre>
          <h3>Matrix U:</h3>
          <pre>{JSON.stringify(U, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Lu;
