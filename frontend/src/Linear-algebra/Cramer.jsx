import { useState } from "react";

function Cramer() {
const [n, setN] = useState(3);
  const [A, setA] = useState(
    Array(3).fill(0).map(() => Array(3).fill(0))
  );
  const [B, setB] = useState(Array(3).fill(0));
  const [X, setX] = useState([]);

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

  // ฟังก์ชันคำนวณ Determinant แบบ recursion
  const determinant = (matrix) => {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;
    for (let j = 0; j < n; j++) {
      const subMatrix = matrix.slice(1).map(row => row.filter((_, col) => col !== j));
      det += matrix[0][j] * determinant(subMatrix) * (j % 2 === 0 ? 1 : -1);
    }
    return det;
  };

  const calculate = () => {
    const detA = determinant(A);
    if (detA === 0) {
      alert("Determinant = 0, ระบบสมการนี้ไม่มีคำตอบเฉพาะ");
      return;
    }

    const results = [];
    for (let i = 0; i < n; i++) {
      const Ai = A.map((row, r) =>
        row.map((val, c) => (c === i ? B[r] : val))
      );
      const detAi = determinant(Ai);
      results.push(detAi / detA);
    }

    setX(results);
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
      <h1>Cramer’s Rule</h1>

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

      {/* ===== Matrix A ===== */}
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

      {/* ===== Vector B ===== */}
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

      {/* ===== ผลลัพธ์ ===== */}
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

export default Cramer;
