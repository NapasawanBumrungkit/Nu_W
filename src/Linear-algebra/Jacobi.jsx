import { useState } from "react";
import Plot from "react-plotly.js";

function Jacobi() {
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [x3, setX3] = useState(0);
  const [x4, setX4] = useState(0);
  const [tol, setTol] = useState(0.000001);
  const [iterations, setIterations] = useState([]);

  const calculate = () => {
    let x1Val = x1;
    let x2Val = x2;
    let x3Val = x3;
    let x4Val = x4;

    let iter = 0;
    const results = [];

    while (true) {
      iter++;

      const x1_new = (12 - 2 * x2Val) / 5.0;
      const x2_new = (17 - 2 * x1Val - 2 * x3Val) / 5.0;
      const x3_new = (14 - 2 * x2Val - 2 * x4Val) / 5.0;
      const x4_new = (7 - 2 * x3Val) / 5.0;

      const err1 = Math.abs(x1_new - x1Val);
      const err2 = Math.abs(x2_new - x2Val);
      const err3 = Math.abs(x3_new - x3Val);
      const err4 = Math.abs(x4_new - x4Val);

      results.push({
        iter,
        x1: x1_new,
        x2: x2_new,
        x3: x3_new,
        x4: x4_new,
        err1,
        err2,
        err3,
        err4,
      });

      x1Val = x1_new;
      x2Val = x2_new;
      x3Val = x3_new;
      x4Val = x4_new;

      if (err1 < tol && err2 < tol && err3 < tol && err4 < tol) break;
      if (iter > 1000) break; // safety
    }

    setIterations(results);
  };

  return (
    <div>
      <h1>Jacobi Iteration Method</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          x1: <input type="number" value={x1} onChange={(e) => setX1(Number(e.target.value))} />
        </label>
        <label>
          x2: <input type="number" value={x2} onChange={(e) => setX2(Number(e.target.value))} />
        </label>
        <label>
          x3: <input type="number" value={x3} onChange={(e) => setX3(Number(e.target.value))} />
        </label>
        <label>
          x4: <input type="number" value={x4} onChange={(e) => setX4(Number(e.target.value))} />
        </label>
        <label>
          Tolerance: <input type="number" value={tol} onChange={(e) => setTol(Number(e.target.value))} />
        </label>
        <button onClick={calculate}>Calculate</button>
      </div>

      {iterations.length > 0 && (
        <>
          <h2>Iterations:</h2>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Iteration</th>
                <th>x1</th><th>Error</th>
                <th>x2</th><th>Error</th>
                <th>x3</th><th>Error</th>
                <th>x4</th><th>Error</th>
              </tr>
            </thead>
            <tbody>
              {iterations.map((row) => (
                <tr key={row.iter}>
                  <td>{row.iter}</td>
                  <td>{row.x1.toFixed(6)}</td>
                  <td>{row.err1.toExponential(3)}</td>
                  <td>{row.x2.toFixed(6)}</td>
                  <td>{row.err2.toExponential(3)}</td>
                  <td>{row.x3.toFixed(6)}</td>
                  <td>{row.err3.toExponential(3)}</td>
                  <td>{row.x4.toFixed(6)}</td>
                  <td>{row.err4.toExponential(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Convergence Graph:</h2>
          <Plot
            data={[
              {
                x: iterations.map((r) => r.iter),
                y: iterations.map((r) => r.x1),
                type: "scatter",
                mode: "lines+markers",
                name: "x1",
              },
              {
                x: iterations.map((r) => r.iter),
                y: iterations.map((r) => r.x2),
                type: "scatter",
                mode: "lines+markers",
                name: "x2",
              },
              {
                x: iterations.map((r) => r.iter),
                y: iterations.map((r) => r.x3),
                type: "scatter",
                mode: "lines+markers",
                name: "x3",
              },
              {
                x: iterations.map((r) => r.iter),
                y: iterations.map((r) => r.x4),
                type: "scatter",
                mode: "lines+markers",
                name: "x4",
              },
            ]}
            layout={{
              title: "Jacobi Iteration Convergence",
              xaxis: { title: "Iteration" },
              yaxis: { title: "Value" },
              width: 800,
              height: 500,
            }}
          />
        </>
      )}
    </div>
  );
}

export default Jacobi;