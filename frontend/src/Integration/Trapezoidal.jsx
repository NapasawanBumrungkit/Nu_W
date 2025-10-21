import { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

function Trapezoidal (){
const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [fx, setFx] = useState("x^2 + 3*x - 1");
  const [result, setResult] = useState(null);
  const [graphData, setGraphData] = useState(null);

  // ฟังก์ชัน f(x)
  const f = (x) => {
    try {
      return evaluate(fx, { x });
    } catch {
      return NaN;
    }
  };

  // คำนวณ Single Trapezoidal Rule
  const handleCalculate = () => {
    const fa = f(a);
    const fb = f(b);
    const trapezoidal = ((b - a) / 2) * (fa + fb);
    setResult(trapezoidal.toFixed(6));

    // เตรียมข้อมูลกราฟ
    const xData = [];
    const yData = [];
    const step = (b - a) / 100;
    for (let x = a; x <= b; x += step) {
      xData.push(x);
      yData.push(f(x));
    }

    // จุด a, b
    const xi = [a, b];
    const yi = [fa, fb];

    setGraphData({ xData, yData, xi, yi });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Single Trapezoidal Rule</h1>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px" }}>
          f(x):{" "}
          <input
            type="text"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            style={{ width: "150px" }}
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

      {result !== null && <h2>Trapezoidal Rule = {result}</h2>}

      {graphData && (
        <Plot
          data={[
            // กราฟฟังก์ชัน
            {
              x: graphData.xData,
              y: graphData.yData,
              type: "scatter",
              mode: "lines",
              name: "f(x)",
              line: { color: "blue" },
            },
            // เส้น trapezoid
            {
              x: [graphData.xi[0], graphData.xi[1]],
              y: [graphData.yi[0], graphData.yi[1]],
              type: "scatter",
              mode: "lines",
              name: "Trapezoid",
              line: { color: "orange", dash: "dot" },
            },
            // จุด a, b
            {
              x: graphData.xi,
              y: graphData.yi,
              type: "scatter",
              mode: "markers",
              name: "Endpoints",
              marker: { color: "red", size: 8 },
            },
          ]}
          layout={{
            width: 700,
            height: 400,
            title: "Graph of f(x) with Single Trapezoid",
            xaxis: { title: "x" },
            yaxis: { title: "f(x)" },
          }}
        />
      )}
    </div>
  );
}
export default Trapezoidal;