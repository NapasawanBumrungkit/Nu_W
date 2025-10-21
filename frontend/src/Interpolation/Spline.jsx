import { useState } from "react";
import Plot from "react-plotly.js";

function Spline() {
  const [numPoints, setNumPoints] = useState(3);
  const [xValues, setXValues] = useState([0, 1, 2]);
  const [yValues, setYValues] = useState([1, 2, 0]);
  const [xTarget, setXTarget] = useState(1.5);
  const [yTarget, setYTarget] = useState(null);

  const handleNumPointsChange = (e) => {
    const n = Number(e.target.value);
    setNumPoints(n);
    setXValues(Array(n).fill(0));
    setYValues(Array(n).fill(0));
  };

  const handleXChange = (i, value) => {
    const newX = [...xValues];
    newX[i] = Number(value);
    setXValues(newX);
  };

  const handleYChange = (i, value) => {
    const newY = [...yValues];
    newY[i] = Number(value);
    setYValues(newY);
  };

  // คำนวณ Cubic Spline Interpolation
  const handleCalculate = () => {
    const n = xValues.length;
    const a = [...yValues];
    const b = Array(n - 1).fill(0);
    const d = Array(n - 1).fill(0);
    const h = [];
    const alpha = Array(n).fill(0);

    for (let i = 0; i < n - 1; i++) {
      h[i] = xValues[i + 1] - xValues[i];
    }

    for (let i = 1; i < n - 1; i++) {
      alpha[i] =
        (3 / h[i]) * (a[i + 1] - a[i]) -
        (3 / h[i - 1]) * (a[i] - a[i - 1]);
    }

    const c = Array(n).fill(0);
    const l = Array(n).fill(1);
    const mu = Array(n).fill(0);
    const z = Array(n).fill(0);

    for (let i = 1; i < n - 1; i++) {
      l[i] = 2 * (xValues[i + 1] - xValues[i - 1]) - h[i - 1] * mu[i - 1];
      mu[i] = h[i] / l[i];
      z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    for (let j = n - 2; j >= 0; j--) {
      c[j] = z[j] - mu[j] * c[j + 1];
      b[j] =
        (a[j + 1] - a[j]) / h[j] - (h[j] * (c[j + 1] + 2 * c[j])) / 3;
      d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    // คำนวณค่า y ที่ xTarget
    let i = 0;
    for (let j = 0; j < n - 1; j++) {
      if (xTarget >= xValues[j] && xTarget <= xValues[j + 1]) {
        i = j;
        break;
      }
    }

    const dx = xTarget - xValues[i];
    const y =
      a[i] + b[i] * dx + c[i] * dx * dx + d[i] * dx * dx * dx;

    setYTarget(y.toFixed(6));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Cubic Spline Interpolation</h1>

      <div>
        <label>จำนวนจุดข้อมูล: </label>
        <input
          type="number"
          min="3"
          value={numPoints}
          onChange={handleNumPointsChange}
          style={{ width: "60px", marginLeft: "10px" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        {xValues.map((_, i) => (
          <div key={i}>
            <label>X{i + 1}: </label>
            <input
              type="number"
              value={xValues[i]}
              onChange={(e) => handleXChange(i, e.target.value)}
              style={{ width: "80px", marginRight: "10px" }}
            />
            <label>Y{i + 1}: </label>
            <input
              type="number"
              value={yValues[i]}
              onChange={(e) => handleYChange(i, e.target.value)}
              style={{ width: "80px" }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>ค่าที่ต้องการคำนวณ x: </label>
        <input
          type="number"
          value={xTarget}
          onChange={(e) => setXTarget(Number(e.target.value))}
          style={{ width: "80px", marginRight: "10px" }}
        />
        <button
          onClick={handleCalculate}
          style={{
            padding: "6px 14px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          คำนวณ
        </button>
      </div>

      {yTarget && (
        <p style={{ marginTop: "15px" }}>
          ผลลัพธ์: f({xTarget}) = <b>{yTarget}</b>
        </p>
      )}

      {yTarget && (
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              mode: "markers",
              name: "จุดข้อมูล",
              marker: { color: "blue", size: 8 },
            },
            {
              x: [xTarget],
              y: [parseFloat(yTarget)],
              mode: "markers",
              name: "ค่าคำนวณ",
              marker: { color: "red", size: 10 },
            },
          ]}
          layout={{
            width: 700,
            height: 500,
            title: "Cubic Spline Interpolation",
            xaxis: { title: "X" },
            yaxis: { title: "Y" },
          }}
        />
      )}
    </div>
  );
}

export default Spline;
