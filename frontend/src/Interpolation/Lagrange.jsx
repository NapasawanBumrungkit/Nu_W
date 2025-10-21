import { useState } from "react";
import Plot from "react-plotly.js";

function Lagrange() {
  const [numPoint, setNumPoint] = useState(3);
  const [xValues, setXValues] = useState(Array(3).fill(0));
  const [yValues, setYValues] = useState(Array(3).fill(0));
  const [xInput, setXInput] = useState(0);
  const [result, setResult] = useState(null);

  const numberPointChange = (e) => {
    const n = Number(e.target.value);
    setNumPoint(n);
    setXValues(Array(n).fill(0));
    setYValues(Array(n).fill(0));
  };

  const xChange = (index, value) => {
    const newX = [...xValues];
    newX[index] = Number(value);
    setXValues(newX);
  };

  const yChange = (index, value) => {
    const newY = [...yValues];
    newY[index] = Number(value);
    setYValues(newY);
  };

  const handleCalculate = () => {
    const n = xValues.length;
    if (n < 2) {
      alert("กรุณากรอกข้อมูลอย่างน้อย 2 จุด");
      return;
    }

    let fx = 0;
    for (let i = 0; i < n; i++) {
      let term = yValues[i];
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term *= (xInput - xValues[j]) / (xValues[i] - xValues[j]);
        }
      }
      fx += term;
    }
    setResult(fx);
  };

  // สร้างจุดกราฟ
  const generateCurve = () => {
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const step = (maxX - minX) / 50;
    const curveX = [];
    const curveY = [];

    for (let xi = minX; xi <= maxX; xi += step) {
      let yi = 0;
      for (let i = 0; i < xValues.length; i++) {
        let term = yValues[i];
        for (let j = 0; j < xValues.length; j++) {
          if (j !== i) {
            term *= (xi - xValues[j]) / (xValues[i] - xValues[j]);
          }
        }
        yi += term;
      }
      curveX.push(xi);
      curveY.push(yi);
    }

    return { curveX, curveY };
  };

  const { curveX, curveY } =
    result !== null ? generateCurve() : { curveX: [], curveY: [] };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Lagrange Interpolation</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>จำนวนชุดข้อมูล: </label>
        <input
          type="number"
          min="2"
          value={numPoint}
          onChange={numberPointChange}
          style={{ width: "60px", marginLeft: "10px" }}
        />
      </div>

      <div>
        <h4>ค่า X และ Y</h4>
        {xValues.map((_, i) => (
          <div key={i} style={{ marginBottom: "5px" }}>
            <label>X{i + 1}: </label>
            <input
              type="number"
              value={xValues[i]}
              onChange={(e) => xChange(i, e.target.value)}
              style={{ width: "80px", marginRight: "10px" }}
            />
            <label>Y{i + 1}: </label>
            <input
              type="number"
              value={yValues[i]}
              onChange={(e) => yChange(i, e.target.value)}
              style={{ width: "80px", marginLeft: "10px" }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>ค่าที่ต้องการหา f(x): </label>
        <input
          type="number"
          value={xInput}
          onChange={(e) => setXInput(Number(e.target.value))}
          style={{ width: "80px", marginLeft: "10px" }}
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
        คำนวณ
      </button>

      {result !== null && (
        <div style={{ marginTop: "20px" }}>
          <p>
            f({xInput}) = <b>{result.toFixed(6)}</b>
          </p>

          <Plot
            data={[
              {
                x: xValues,
                y: yValues,
                mode: "markers",
                name: "ข้อมูลจริง",
                marker: { color: "blue", size: 8 },
              },
              {
                x: curveX,
                y: curveY,
                mode: "lines",
                name: "Lagrange Polynomial",
                line: { color: "red" },
              },
              {
                x: [xInput],
                y: [result],
                mode: "markers+text",
                name: "ค่าที่หาได้",
                marker: { color: "green", size: 10 },
                text: [`(${xInput}, ${result.toFixed(3)})`],
                textposition: "top center",
              },
            ]}
            layout={{
              width: 700,
              height: 500,
              title: "กราฟ Lagrange Interpolation",
              xaxis: { title: "X" },
              yaxis: { title: "Y" },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Lagrange;
