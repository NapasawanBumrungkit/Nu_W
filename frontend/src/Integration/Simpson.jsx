import { useState } from "react";
import Plot from "react-plotly.js";

function LinearRegression() {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");
  const [slope, setSlope] = useState(null);
  const [intercept, setIntercept] = useState(null);

  const handleCalculate = () => {
    const x = xValues.split(",").map(Number);
    const y = yValues.split(",").map(Number);

    if (x.length !== y.length || x.length < 2) {
      alert("กรุณากรอกข้อมูล X และ Y ให้มีจำนวนเท่ากัน และอย่างน้อย 2 ค่า");
      return;
    }

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    setSlope(m);
    setIntercept(b);
  };

  const generateLine = () => {
    const x = xValues.split(",").map(Number);
    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    const lineX = [minX, maxX];
    const lineY = lineX.map((xi) => slope * xi + intercept);
    return { lineX, lineY };
  };

  const { lineX, lineY } = slope !== null ? generateLine() : { lineX: [], lineY: [] };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Linear Regression </h2>

      <div style={{ marginBottom: "10px" }}>
        <label> X (use ,): </label>
        <input
          type="text"
          value={xValues}
          onChange={(e) => setXValues(e.target.value)}
          placeholder=" -2,-1,0,1,2"
          style={{ width: "250px", marginLeft: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label> Y (use ,): </label>
        <input
          type="text"
          value={yValues}
          onChange={(e) => setYValues(e.target.value)}
          placeholder=" -3,-1,1,3,5"
          style={{ width: "250px", marginLeft: "5px" }}
        />
      </div>

      <button
        onClick={handleCalculate}
        style={{
          padding: "8px 16px",
          marginTop: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        calculate
      </button>

      {slope !== null && (
        <div style={{ marginTop: "20px" }}>
          <p>
            สมการเส้นตรง: <b>y = {slope.toFixed(3)}x + {intercept.toFixed(3)}</b>
          </p>

          <Plot
            data={[
              {
                x: xValues.split(",").map(Number),
                y: yValues.split(",").map(Number),
                mode: "markers",
                name: "ข้อมูลจริง",
                marker: { color: "blue", size: 8 },
              },
              {
                x: lineX,
                y: lineY,
                mode: "lines",
                name: "g(x)",
                line: { color: "red" },
              },
            ]}
            layout={{
              width: 700,
              height: 500,
              title: "กราฟ Linear Regression",
              xaxis: { title: "X" },
              yaxis: { title: "Y" },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LinearRegression;
