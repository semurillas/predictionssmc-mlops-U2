import { useState } from "react";

export default function Home() {
  const [edad, setEdad] = useState<number | ''>('');
  const [peso, setPeso] = useState<number | ''>('');
  const [ictericia, setIctericia] = useState(false);
  const [dolorAbdominal, setDolorAbdominal] = useState(false);
  const [fatigaExtrema, setFatigaExtrema] = useState(false);
  const [hinchazonAbdominal, setHinchazonAbdominal] = useState(false);
  const [confusion, setConfusion] = useState(false);
  const [orinaOscura, setOrinaOscura] = useState(false);
  const [hecesPalidas, setHecesPalidas] = useState(false);
  const [resultado, setResultado] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (edad === '' || peso === '') {
      alert("Por favor, completa los campos de edad y peso.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        edad,
        peso,
        ictericia,
        dolor_abdominal: dolorAbdominal,
        fatiga_extrema: fatigaExtrema,
        hinchazon_abdominal: hinchazonAbdominal,
        confusion,
        orina_oscura: orinaOscura,
        heces_palidas: hecesPalidas,
      }),
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
        maxWidth: "500px"
      }}>
        <h2 style={{ textAlign: "center", color: "#000" }}>Formulario de Evaluación de Severidad Clínica</h2>
        <form onSubmit={handleSubmit}>
          <fieldset style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
            <legend style={{ color: "#000" }}>Síntomas y datos del paciente</legend>

            <label style={{ color: "#000" }}>Edad:</label><br />
            <input type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} style={inputStyle} /><br />

            <label style={{ color: "#000" }}>Peso:</label><br />
            <input type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} style={inputStyle} /><br />

            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={ictericia} onChange={(e) => setIctericia(e.target.checked)} /> Ictericia</label>
            </div>
            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={dolorAbdominal} onChange={(e) => setDolorAbdominal(e.target.checked)} /> Dolor abdominal</label>
            </div>
            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={fatigaExtrema} onChange={(e) => setFatigaExtrema(e.target.checked)} /> Fatiga extrema</label>
            </div>
            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={hinchazonAbdominal} onChange={(e) => setHinchazonAbdominal(e.target.checked)} /> Hinchazón abdominal</label>
            </div>
            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={confusion} onChange={(e) => setConfusion(e.target.checked)} /> Confusión o desorientación</label>
            </div>
            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={orinaOscura} onChange={(e) => setOrinaOscura(e.target.checked)} /> Orina oscura</label>
            </div>
            <div style={{ color: "#000", marginBottom: "10px" }}>
              <label><input type="checkbox" checked={hecesPalidas} onChange={(e) => setHecesPalidas(e.target.checked)} /> Heces pálidas</label>
            </div>

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