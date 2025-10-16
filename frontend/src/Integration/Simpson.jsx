import { useState } from "react";
import Plot from "react-plotly.js";

function LinearRegression() {
  const [numPoint, setNumpoint] = useState(3);
  const [xValues, setXValues] = useState(Array(3).fill(0));
  const [yValues, setYValues] = useState(Array(3).fill(0));
  const [slope, setSlope] = useState(null);
  const [intercept, setIntercept] = useState(null);

  const numberPointChange = (e) => {
    const n = Number(e.target.value);
    setNumpoint(n);
    setXValues(Array(n).fill(0));
    setYValues(Array(n).fill(0));
  };

  const xChange = (index, value) => {
    const newX = [...xValues];
    newX[index] = Number(value);
    setXValues(newX);
  }

  const yChange = (index, value) =>{
    const newy = [...yValues];
    newy[index] = Number(value);
    setYValues(newy);
  }

  const handleCalculate = () => {
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
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const lineX = [minX, maxX];
    const lineY = lineX.map((xi) => slope * xi + intercept);
    return { lineX, lineY };
  };

  const { lineX, lineY } = slope !== null ? generateLine() : { lineX: [], lineY: [] };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Linear Regression </h2>

      <div style={{ marginBottom: "10px" }}>
        <label> จำวนวนชุดข้อมูล: </label>
        <input
          type="number"
          min="2"
          value={numPoint}
          onChange={numberPointChange}
          style={{ width: "60px", marginLeft: "50px" }}
        />
      </div>

      <div>
        <h4>value x and y</h4>
        {xValues.map((_, i) => (
          <div key={i} style = {{marginBottom: "5px"}} >
            <label>X{i + 1}:</label>
            <input
              type="number"
              value={xValues[i]}
              onChange={(e) => xChange(i, e.target.value)}
              style={{ width: "80px", marginRight: "10px" }}
            />
            <lable>Y{i + 1}:</lable>
            <input
              type="number"
              value={yValues[i]}
              onChange={(e) => yChange(i, e.target.value)}
              style={{width: "80px", marginLeft: "10px"}}
            />
          </div>
        ))}
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