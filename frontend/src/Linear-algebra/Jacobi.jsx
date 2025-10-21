import { useState } from "react";
import Plot from "react-plotly.js";

function Jacobi() {
  const [n, setN] = useState(3);
  const [A, setA] = useState(
    Array(3).fill(0).map(() => Array(3).fill(0))
  );
  const [B, setB] = useState(Array(3).fill(0));
  const [X, setX] = useState([]);
  const [iterations, setIterations] = useState(50); 
  const [tolerance, setTolerance] = useState(0.000001); 

  const handleSizeChange = (size) => {
    const newSize = parseInt(size);
    setN(newSize);
    setA(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setB(Array(newSize).fill(0));
    setX([]);
  };

  const handleAChange = (i, j, value) => {
    const newA = [...A];
    newA[i][j] = parseFloat(value) || 0;
    setA(newA);
  };

  const handleBChange = (i, value) => {
    const newB = [...B];
    newB[i] = parseFloat(value) || 0;
    setB(newB);
  };

  const calculate = () => {
    const n = A.length;
    let xOld = Array(n).fill(0);
    let xNew = Array(n).fill(0);
    let converged = false;

    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          if (j !== i) sum += A[i][j] * xOld[j];
        }
        xNew[i] = (B[i] - sum) / A[i][i];
      }

     
      let error = 0;
      for (let i = 0; i < n; i++) {
        error += Math.abs(xNew[i] - xOld[i]);
      }

      if (error < tolerance) {
        converged = true;
        break;
      }

      xOld = [...xNew];
    }

    if (converged) {
      setX(xNew);
    } else {
      alert("ไม่ลู่เข้า (ไม่สามารถหาคำตอบได้ภายในจำนวนรอบที่กำหนด)");
      setX([]);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Jacobi Iteration Method</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <b>Matrix Size : </b>
          <select
            value={n}
            onChange={(e) => handleSizeChange(e.target.value)}
          >
            {[2, 3, 4, 5].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Iterations :
          <input
            type="number"
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            style={{ width: "70px", marginLeft: "5px", textAlign: "center" }}
          />
        </label>

        <label style={{ marginLeft: "20px" }}>
          Tolerance :
          <input
            type="number"
            step="0.000001"
            value={tolerance}
            onChange={(e) => setTolerance(parseFloat(e.target.value))}
            style={{ width: "100px", marginLeft: "5px", textAlign: "center" }}
          />
        </label>

        <button
          onClick={calculate}
          style={{
            marginLeft: "20px",
            padding: "8px 16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>
      </div>

      <h3>Matrix A:</h3>
      <table
        border="1"
        cellPadding="5"
        style={{ borderCollapse: "collapse", marginBottom: "10px" }}
      >
        <tbody>
          {A.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td key={j}>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => handleAChange(i, j, e.target.value)}
                    style={{
                      width: "60px",
                      textAlign: "center",
                      border: "none",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Vector b:</h3>
      <div>
        {B.map((val, i) => (
          <input
            key={i}
            type="number"
            value={val}
            onChange={(e) => handleBChange(i, e.target.value)}
            style={{
              width: "60px",
              margin: "3px",
              textAlign: "center",
              border: "none",
            }}
          />
        ))}
      </div>

      {X.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>ผลลัพธ์ (Solution):</h3>
          {X.map((xi, i) => (
            <p key={i}>
              x{i + 1} = {xi.toFixed(6)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}


export default Jacobi;