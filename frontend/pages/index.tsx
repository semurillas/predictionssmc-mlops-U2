import { useState } from "react";

export default function Home() {
  const [edad, setEdad] = useState(0);
  const [peso, setPeso] = useState(0);
  const [presion, setPresion] = useState(0);
  const [resultado, setResultado] = useState("");

  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ edad, peso, presion }),
    });
    const data = await res.json();
    setResultado(data.resultado);
  };
  

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "40px", 
        borderRadius: "10px", 
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", color: "#000" }}>Formulario de Predicción de Riesgo Cardiovascular</h2>
        <form onSubmit={handleSubmit}>
          <fieldset style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
            <legend style={{ color: "#000" }}>Datos del paciente</legend>

            <label style={{ color: "#000" }}>Edad:</label><br /> 
            <input type="number" value={edad} onChange={(e) => setEdad(+e.target.value)} style={inputStyle} /><br />

            <label style={{ color: "#000" }}>Peso:</label><br />
            <input type="number" value={peso} onChange={(e) => setPeso(+e.target.value)} style={inputStyle} /><br />

            <label style={{ color: "#000" }}>Presión:</label><br />
            <input type="number" value={presion} onChange={(e) => setPresion(+e.target.value)} style={inputStyle} /><br />

            <button type="submit" style={buttonStyle}>Predecir</button>
          </fieldset>
        </form>

        {resultado && (
          <div style={{ marginTop: "20px", textAlign: "center", fontWeight: "bold", color: "#2e7d32" }}>
            Resultado: {resultado}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  color: "#000"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};