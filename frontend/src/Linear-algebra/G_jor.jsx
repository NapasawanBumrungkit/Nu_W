import { useState } from "react";

function G_jor() {
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

  const calculate = () => {
    let mat = A.map(row => [...row]);
    let vec = [...B];
    const n = mat.length;

    for (let k = 0; k < n; k++) {
      if (mat[k][k] === 0) {
        for (let i = k + 1; i < n; i++) {
          if (mat[i][k] !== 0) {
            [mat[k], mat[i]] = [mat[i], mat[k]];
            [vec[k], vec[i]] = [vec[i], vec[k]];
            break;
          }
        }
      }

      const pivot = mat[k][k];
      for (let j = 0; j < n; j++) {
        mat[k][j] /= pivot;
      }
      vec[k] /= pivot;

      for (let i = 0; i < n; i++) {
        if (i !== k) {
          const factor = mat[i][k];
          for (let j = 0; j < n; j++) {
            mat[i][j] -= factor * mat[k][j];
          }
          vec[i] -= factor * vec[k];
        }
      }
    }

    setX(vec); 
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Gauss-Jordan Elimination Method</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <b>Matrix Size : </b>
          <select value={n} onChange={(e) => handleSizeChange(e.target.value)}>
            {[2, 3, 4, 5].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>

        <button
          onClick={calculate}
          style={{ marginLeft: "20px", padding: "8px 16px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Calculate
        </button>
      </div>

      
      <h3>Matrix A:</h3>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", marginBottom: "10px" }}>
        <tbody>
          {A.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td key={j}>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => handleAChange(i, j, e.target.value)}
                    style={{ width: "60px", textAlign: "center", border: "none" }}
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
            style={{ width: "60px", margin: "3px", textAlign: "center", border: "none" }}
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

export default G_jor;