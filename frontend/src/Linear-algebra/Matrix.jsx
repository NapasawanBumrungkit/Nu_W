import { useState } from "react";

function Matrix () {
     const [n, setN] = useState(3);
  const [A, setA] = useState(
    Array(3).fill(0).map(() => Array(3).fill(0))
  );
  const [B, setB] = useState(Array(3).fill(0));
  const [X, setX] = useState([]);
  const [inverseA, setInverseA] = useState([]);

  const handleSizeChange = (size) => {
    const newSize = parseInt(size);
    setN(newSize);
    setA(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setB(Array(newSize).fill(0));
    setX([]);
    setInverseA([]);
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
    let mat = A.map((row) => [...row]);
    let identity = Array(n)
      .fill(0)
      .map((_, i) => Array(n).fill(0).map((__, j) => (i === j ? 1 : 0)));

    // === สร้างเมทริกซ์ผกผันด้วย Gauss-Jordan ===
    for (let i = 0; i < n; i++) {
      let pivot = mat[i][i];

      if (pivot === 0) {
        // หาแถวใหม่มาแทน
        let swapRow = i + 1;
        while (swapRow < n && mat[swapRow][i] === 0) swapRow++;
        if (swapRow === n) {
          alert("Matrix ไม่สามารถผกผันได้ (det = 0)");
          return;
        }
        [mat[i], mat[swapRow]] = [mat[swapRow], mat[i]];
        [identity[i], identity[swapRow]] = [identity[swapRow], identity[i]];
        pivot = mat[i][i];
      }

      // ทำให้ pivot = 1
      for (let j = 0; j < n; j++) {
        mat[i][j] /= pivot;
        identity[i][j] /= pivot;
      }

      // ทำให้ค่าอื่นใน column เดียวกันเป็น 0
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = mat[k][i];
          for (let j = 0; j < n; j++) {
            mat[k][j] -= factor * mat[i][j];
            identity[k][j] -= factor * identity[i][j];
          }
        }
      }
    }

    // === คำนวณ X = A⁻¹ * B ===
    const Xresult = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        Xresult[i] += identity[i][j] * B[j];
      }
    }

    setInverseA(identity);
    setX(Xresult);
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
      <h1>Matrix Inversion Method</h1>

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

      {/* ===== Inverse Matrix ===== */}
      {inverseA.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Matrix A⁻¹ :</h3>
          <table
            border="1"
            cellPadding="5"
            style={{ borderCollapse: "collapse", marginBottom: "10px" }}
          >
            <tbody>
              {inverseA.map((row, i) => (
                <tr key={i}>
                  {row.map((val, j) => (
                    <td key={j}>{val.toFixed(6)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default Matrix;