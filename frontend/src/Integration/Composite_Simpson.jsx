import { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";


function Composite_Simpson (){
  const [a, setA] = useState(-1);
  const [b, setB] = useState(2);
  const [n, setN] = useState(4);
  const [fx, setFx] = useState("x^7+2*x^3-1");
  const [result, setResult] = useState(null);
  const [graphData, setGraphData] = useState(null);

  const f = (x) => {
    try {
      return evaluate(fx, { x });
    } catch {
      return NaN;
    }
  };

  const handleCalculate = () => {
    if (n % 2 !== 0) {
      alert("n ต้องเป็นจำนวนคู่เท่านั้น!");
      return;
    }

    const h = (b - a) / n;
    let sum = f(a) + f(b);

    
    const xi = [];
    const yi = [];

    for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      xi.push(x);
      yi.push(f(x));

      if (i > 0 && i < n) {
        const coef = i % 2 === 0 ? 2 : 4;
        sum += coef * f(x);
      }
    }

    const simpson = (h / 3) * sum;
    setResult(simpson.toFixed(6));

    
    const xData = [];
    const yData = [];
    const step = (b - a) / 100;
    for (let x = a; x <= b; x += step) {
      xData.push(x);
      yData.push(f(x));
    }

    setGraphData({ xData, yData, xi, yi });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Composite Simpson's Rule</h1>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px" }}>
          f(x):{" "}
          <input
            type="text"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            style={{ width: "120px" }}
          />
        </label>

        <label style={{ marginRight: "10px" }}>
          a:{" "}
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </label>

        <label style={{ marginRight: "10px" }}>
          b:{" "}
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </label>

        <label style={{ marginRight: "10px" }}>
          n (even):{" "}
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </label>

        <button
          onClick={handleCalculate}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "5px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <h2>Composite Simpson’s Rule = {result}</h2>
      )}

      {graphData && (
        <Plot
          data={[
            {
              x: graphData.xData,
              y: graphData.yData,
              type: "scatter",
              mode: "lines",
              name: "f(x)",
              line: { color: "blue" },
            },
            {
              x: graphData.xi,
              y: graphData.yi,
              type: "scatter",
              mode: "markers",
              name: "Data Points",
              marker: { color: "red", size: 8, symbol: "circle" },
            },
          ]}
          layout={{
            width: 700,
            height: 400,
            title: "Graph of f(x) with Sample Points (Simpson’s Rule)",
            xaxis: { title: "x" },
            yaxis: { title: "f(x)" },
          }}
        />
      )}
    </div>
  );
}
export default Composite_Simpson;