import { useState } from "react";

function Lagrange (){
    const [dataPoints, setDataPoints] = useState([{x: 0, y: 0}]);
    cont [rootLR , setRootLR] = useState(null);

    const updatePoint = (index, key, value) => {
    const num = parseFloat(value);
    const newPoints = dataPoints.map((p, i) =>
      i === index ? { ...p, [key]: isNaN(num) ? 0 : num } : p
    );
    setDataPoints(newPoints);
  };

  
  const addPoint = () => setDataPoints([...dataPoints, { x: 0, y: 0 }]);
  const removePoint = (index) =>
    setDataPoints(dataPoints.filter((_, i) => i !== index));

    const calculaeLR = () =>{
        const n = dataPoints.length;
        if(n < 2){
            alert("Error");
            return
        }
    const sumX = dataPoints.reduce((sum, p) => sum + p.x , 0);
    const sumY = dataPoints.reduce((sum, p) => sum + p.y, 0);
    const sumXY = dataPoints.reduce((sum, p) => sum + p.y * p.x, 0);
    const sumXX =  dataPoints.reduce((sum, p) => sum + p.x * p.x, 0);

    const a1 = n * sumXX - sumX * sumX;
    if(a1 === 0){
        alert("Not calculation");
        return;
    }

    const m = (n * sumXY - sumX * sumY)/a1;
    const b = (sumY - m * sumX) / n;

    setRootLR({m , b});
    };

    return (
        <>
            <h1>Lagrange Interpolation</h1> 


            <h2>DataPoint</h2>
            {dataPoints.map((p, i) => (
                <div key={i} style={{marginButton: "5px"}}> 
                  X:{" "}
                  <input
                     type="number"
                     value={p.x}
                     onChange={(e) => updatePoint(i, "x" , e.target.value)}
                     style={{width: "60px", marginBottom: "5px"}}
                  />
                  Y:{" "}
                  <input
                     type="number"
                     value={p.y}
                     onChange={(e) => updatePoint(i, "y", e.target.value)}
                     style={{width: "60px", marginBottom: "5px"}}
                  />
                </div>
            ))}
        
            <input
              
            />



            
        </>
    )
}
export default Lagrange;