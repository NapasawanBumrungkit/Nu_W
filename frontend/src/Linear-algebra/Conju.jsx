import { useState } from "react";

function Conju() {
  const [n, setN] = useState(3);
  const [A, setA] = useState(Array(3).fill(0).map(() => Array(3).fill(0)));
  const [B, setB] = useState(Array(3).fill(0));
  const [X, setX] = useState([]);
  const [errorList, setErrorList] = useState([]);

  const handleSizeChange = (size) => {
    const newSize = parseInt(size);
    setN(newSize);
    setA(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setB(Array(newSize).fill(0));
    setX([]);
    setErrorList([]);
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

  const dot = (v1, v2) => v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  const matVec = (mat, vec) => mat.map(row => dot(row, vec));
  const vecAdd = (v1, v2, alpha = 1) => v1.map((val, i) => val + alpha * v2[i]);
  const vecSub = (v1, v2, alpha = 1) => v1.map((val, i) => val - alpha * v2[i]);
  const vecNorm = (v) => Math.sqrt(dot(v, v));

  const calculate = () => {
    let x = Array(n).fill(0);
    let r = vecSub(B, matVec(A, x));
    let p = [...r];
    let rsold = dot(r, r);
    const tol = 0.001; // ε = 0.001%
    const maxIter = n * 50;
    const errors = [];

    for (let i = 0; i < maxIter; i++) {
      const x_old = [...x];
      const Ap = matVec(A, p);
      const alpha = rsold / dot(p, Ap);
      x = vecAdd(x, p, alpha);
      r = vecSub(r, Ap, alpha);
      const rsnew = dot(r, r);
      if (Math.sqrt(rsnew) < 1e-12) break;

      // คำนวณ relative error %
      const err = (vecNorm(vecSub(x, x_old)) / (vecNorm(x) + 1e-12)) * 100;
      errors.push(err);

      if (err < tol) break;

      const beta = rsnew / rsold;
      p = vecAdd(r, p, beta);
      rsold = rsnew;
    }

    setX(x);
    setErrorList(errors);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Conjugate Gradient Method with Error</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <b>Matrix Size : </b>
          <select value={n} onChange={(e) => handleSizeChange(e.target.value)}>
            {[2,3,4,5].map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>

        <button onClick={calculate} style={{ marginLeft: "20px", padding: "8px 16px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Calculate
        </button>
      </div>

      {/* ===== Matrix A ===== */}
      <h3>Matrix A:</h3>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", marginBottom: "10px" }}>
        <tbody>
          {A.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td key={j}>
                  <input type="number" value={val} onChange={(e) => handleAChange(i, j, e.target.value)} style={{ width: "60px", textAlign: "center", border: "none" }}/>
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
          <input key={i} type="number" value={val} onChange={(e) => handleBChange(i, e.target.value)} style={{ width: "60px", margin: "3px", textAlign: "center", border: "none" }}/>
        ))}
      </div>

      {/* ===== ผลลัพธ์ ===== */}
      {X.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>ผลลัพธ์ (Solution):</h3>
          {X.map((xi, i) => <p key={i}>x{i+1} = {xi.toFixed(6)}</p>)}

          <h3>Error (%) per iteration:</h3>
          {errorList.map((err, i) => <p key={i}>Iteration {i+1}: {err.toExponential(3)}%</p>)}
        </div>
      )}
    </div>
  );
}

export default Conju;
