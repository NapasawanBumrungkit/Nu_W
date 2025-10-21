import { useState } from "react";
import Plot from "react-plotly.js";

function Newtondiff() {
  const [numPoint, setNumPoint] = useState(3);
  const [xValues, setXValues] = useState(Array(3).fill(0));
  const [yValues, setYValues] = useState(Array(3).fill(0));
  const [xInput, setXInput] = useState(0);
  const [result, setResult] = useState(null);
  const [divDiffTable, setDivDiffTable] = useState([]);

  // เมื่อเปลี่ยนจำนวนจุด
  const handleNumChange = (e) => {
    const n = Number(e.target.value);
    setNumPoint(n);
    setXValues(Array(n).fill(0));
    setYValues(Array(n).fill(0));
  };

  const handleXChange = (index, value) => {
    const newX = [...xValues];
    newX[index] = Number(value);
    setXValues(newX);
  };

  const handleYChange = (index, value) => {
    const newY = [...yValues];
    newY[index] = Number(value);
    setYValues(newY);
  };

  // ฟังก์ชันคำนวณ Newton Divided Difference
  const handleCalculate = () => {
    const n = xValues.length;
    if (n < 2) {
      alert("กรุณากรอกข้อมูลอย่างน้อย 2 จุด");
      return;
    }

    // สร้างตาราง divided difference
    const table = Array.from({ length: n }, (_, i) =>
      Array(n).fill(0)
    );
    for (let i = 0; i < n; i++) {
      table[i][0] = yValues[i];
    }

    // คำนวณค่าตาราง divided difference
    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        table[i][j] =
          (table[i + 1][j - 1] - table[i][j - 1]) /
          (xValues[i + j] - xValues[i]);
      }
    }

    // ค่าคงที่ a0, a1, a2, ...
    const coeffs = table[0].slice(0, n);
    setDivDiffTable(table);

    // คำนวณค่า f(x)
    let fx = coeffs[0];
    for (let i = 1; i < n; i++) {
      let term = coeffs[i];
      for (let j = 0; j < i; j++) {
        term *= (xInput - xValues[j]);
      }
      fx += term;
    }

    setResult(fx);
  };

  // สร้างกราฟเส้นโค้งจากสมการ Newton
  const generateCurve = () => {
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const step = (maxX - minX) / 50;
    const curveX = [];
    const curveY = [];

    const n = xValues.length;
    const table = Array.from({ length: n }, (_, i) =>
      Array(n).fill(0)
    );
    for (let i = 0; i < n; i++) table[i][0] = yValues[i];
    for (let j = 1; j < n; j++)
      for (let i = 0; i < n - j; i++)
        table[i][j] =
          (table[i + 1][j - 1] - table[i][j - 1]) /
          (xValues[i + j] - xValues[i]);
    const coeffs = table[0].slice(0, n);

    for (let xi = minX; xi <= maxX; xi += step) {
      let yi = coeffs[0];
      for (let i = 1; i < n; i++) {
        let term = coeffs[i];
        for (let j = 0; j < i; j++) {
          term *= (xi - xValues[j]);
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
      <h1>Newton Divided-Differences</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>จำนวนจุดข้อมูล: </label>
        <input
          type="number"
          min="2"
          value={numPoint}
          onChange={handleNumChange}
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
              onChange={(e) => handleXChange(i, e.target.value)}
              style={{ width: "80px", marginRight: "10px" }}
            />
            <label>Y{i + 1}: </label>
            <input
              type="number"
              value={yValues[i]}
              onChange={(e) => handleYChange(i, e.target.value)}
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

          {/* ตาราง Divided Differences */}
          <div style={{ display: "inline-block", textAlign: "left", marginTop: "20px" }}>
            <h4>ตาราง Divided Difference</h4>
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>i</th>
                  {[...Array(numPoint).keys()].map((j) => (
                    <th key={j}>Δ{j}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {divDiffTable.map((row, i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    {row.map((v, j) => (
                      <td key={j}>{isNaN(v) ? "" : v.toFixed(6)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* กราฟ */}
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
                name: "Newton Polynomial",
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
              title: "กราฟ Newton Divided Difference",
              xaxis: { title: "X" },
              yaxis: { title: "Y" },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Newtondiff;
