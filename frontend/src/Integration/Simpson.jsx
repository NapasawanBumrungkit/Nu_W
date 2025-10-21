import { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

function Simpson() {
  const [func, setFunc] = useState("x^2");
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [result, setResult] = useState(null);
  const [plotData, setPlotData] = useState([]);

  const handleCalculate = () => {
    const mid = (a + b) / 2;
    const fa = evaluate(func, { x: a });
    const fm = evaluate(func, { x: mid });
    const fb = evaluate(func, { x: b });

    const integral = ((b - a) / 6) * (fa + 4 * fm + fb);
    setResult(integral);

    const xVals = [a, mid, b];
    const yVals = [fa, fm, fb];
    setPlotData([{
      x: xVals,
      y: yVals,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: 'red', size: 8 },
      line: { color: 'blue', width: 2 }
    }]);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Simpson's Rule</h1>

      {/* แถวเดียวกัน */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        <label>
          f(x):
          <input
            type="text"
            value={func}
            onChange={(e) => setFunc(e.target.value)}
            style={{ marginLeft: "5px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", width: "150px" }}
          />
        </label>

        <label>
          a:
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            style={{ marginLeft: "5px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", width: "80px" }}
          />
        </label>

        <label>
          b:
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            style={{ marginLeft: "5px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", width: "80px" }}
          />
        </label>

        <button
          onClick={handleCalculate}
          style={{
            padding: "7px 15px",
            backgroundColor: "#4A90E2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <h2 style={{ color: "#27AE60" }}>Result: {result}</h2>
      )}

      {plotData.length > 0 && (
        <Plot
          data={plotData}
          layout={{
            width: 650,
            height: 400,
            title: "Function Plot",
            xaxis: { title: "x", showgrid: true },
            yaxis: { title: "f(x)", showgrid: true },
            plot_bgcolor: "#fff",
            paper_bgcolor: "#fff",
          }}
        />
      )}
    </div>
  );
}

export default Simpson;
