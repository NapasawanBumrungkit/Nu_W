import { useState } from "react";
import Plot from "react-plotly.js";

function Conju() {
  const [size, setSize] = useState(3);
  const [A, setA] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));
  const [b, setB] = useState(Array(3).fill(0));
  const [result, setResult] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleMatrixChange = (i, j, value) => {
    const newA = [...A];
    newA[i][j] = parseFloat(value) || 0;
    setA(newA);
  };

  const handleBChange = (i, value) => {
    const newB = [...b];
    newB[i] = parseFloat(value) || 0;
    setB(newB);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setA(Array.from({ length: newSize }, () => Array(newSize).fill(0)));
    setB(Array(newSize).fill(0));
    setResult([]);
    setIterations([]);
    setErrors([]);
  };

  const conjugateGradient = () => {
    const n = size;
    const x = Array(n).fill(0);
    let r = Array.from(b);
    let p = Array.from(r);
    let rsold = r.reduce((sum, val) => sum + val * val, 0);

    const iter = [];
    const err = [];

    for (let k = 0; k < 1000; k++) {
      // Ap = A * p
      const Ap = Array(n)
        .fill(0)
        .map((_, i) => p.reduce((sum, _, j) => sum + A[i][j] * p[j], 0));

      const alpha = rsold / p.reduce((sum, _, i) => sum + p[i] * Ap[i], 0);

      // x = x + alpha * p
      for (let i = 0; i < n; i++) x[i] += alpha * p[i];

      // r = r - alpha * Ap
      for (let i = 0; i < n; i++) r[i] -= alpha * Ap[i];

      const rsnew = r.reduce((sum, val) => sum + val * val, 0);

      iter.push(k + 1);
      err.push(Math.sqrt(rsnew));

      if (Math.sqrt(rsnew) < 1e-6) break;

      const beta = rsnew / rsold;
      for (let i = 0; i < n; i++) p[i] = r[i] + beta * p[i];

      rsold = rsnew;
    }

    setResult(x);
    setIterations(iter);
    setErrors(err);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Conjugate Gradient Method
      </h1>

      {/* Matrix size input */}
      <div className="flex justify-center mb-4">
        <label className="mr-2 font-semibold">Matrix Size:</label>
        <input
          type="number"
          min="2"
          max="6"
          value={size}
          onChange={(e) => handleSizeChange(parseInt(e.target.value))}
          className="border p-1 w-16 text-center rounded"
        />
      </div>

      {/* Matrix A input */}
      <div className="grid justify-center mb-4">
        <h2 className="font-semibold mb-2 text-center">Matrix A</h2>
        {A.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                step="any"
                value={val}
                onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                className="border w-16 p-1 m-1 text-center rounded"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Vector b input */}
      <div className="grid justify-center mb-4">
        <h2 className="font-semibold mb-2 text-center">Vector b</h2>
        <div className="flex justify-center">
          {b.map((val, i) => (
            <input
              key={i}
              type="number"
              step="any"
              value={val}
              onChange={(e) => handleBChange(i, e.target.value)}
              className="border w-16 p-1 m-1 text-center rounded"
            />
          ))}
        </div>
      </div>

      {/* Calculate button */}
      <div className="text-center">
        <button
          onClick={conjugateGradient}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          คำนวณ
        </button>
      </div>

      {/* Result */}
      {result.length > 0 && (
        <div className="mt-6 text-center">
          <h2 className="font-semibold mb-2">ผลลัพธ์ (x):</h2>
          <p>
            {result.map((x, i) => (
              <span key={i} className="mr-3">
                x{i + 1} = {x.toFixed(6)}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Error graph */}
      {errors.length > 0 && (
        <div className="mt-6">
          <Plot
            data={[
              {
                x: iterations,
                y: errors,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
                name: "Error per iteration",
              },
            ]}
            layout={{
              title: "Convergence of Conjugate Gradient Method",
              xaxis: { title: "Iteration" },
              yaxis: { title: "Error", type: "log" },
            }}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

export default Conju;
