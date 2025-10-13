import { useState } from "react";

function G_jor() {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState(
    Array.from({ length: 3 }, () => Array(4).fill(0))
  );
  const [result, setResult] = useState([]);

  const handleChange = (i, j, value) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const handleSizeChange = (e) => {
    let n = Number(e.target.value);
    if (n < 2) n = 2;
    if (n > 8) n = 8;
    setSize(n);
    setMatrix(Array.from({ length: n }, () => Array(n + 1).fill(0)));
    setResult([]);
  };

  const calculate = () => {
    let A = matrix.map((row) => [...row]);
    const n = size;

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
      }
      [A[i], A[maxRow]] = [A[maxRow], A[i]];

      const diag = A[i][i];
      if (diag === 0) {
        alert("No unique solution!");
        return;
      }

      for (let j = 0; j < n + 1; j++) A[i][j] /= diag;

      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = A[k][i];
          for (let j = 0; j < n + 1; j++) {
            A[k][j] -= factor * A[i][j];
          }
        }
      }
    }

    const res = A.map((row) => row[n]);
    setResult(res);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gauss-Jordan Elimination</h1>

      <label>
        Matrix Size (2-8):
        <input
          type="number"
          value={size}
          onChange={handleSizeChange}
          style={{ width: "60px", margin: "5px" }}
        />
      </label>

      {matrix.map((row, i) => (
        <div key={i}>
          {row.map((val, j) => (
            <input
              key={j}
              type="number"
              value={val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              style={{ width: "60px", margin: "3px" }}
            />
          ))}
        </div>
      ))}

      <button onClick={calculate} style={{ marginTop: "10px" }}>Calculate</button>

      {result.length > 0 && (
        <div>
          <h2>Result:</h2>
          <ul>
            {result.map((val, i) => (
              <li key={i}>x{i + 1} = {val.toFixed(6)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default G_jor;