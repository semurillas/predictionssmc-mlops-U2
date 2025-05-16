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
  const [reporte, setReporte] = useState<Reporte | null>(null);

  type Prediccion = {
    resultado: string;
    fecha: string;
  };
  
  type Reporte = {
    total_por_categoria: { [key: string]: number };
    ultimas_5: Prediccion[];
    fecha_ultima_prediccion: string;
  };

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


  const handleReporte = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reporte`);
    const data = await res.json();
    setReporte(data);
  };


  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      padding: "40px"
    }}>
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}></div>


      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "400px"
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

        <button onClick={handleReporte} style={{ ...buttonStyle, marginTop: "20px", backgroundColor: "#555" }}>
            Ver reporte
        </button>
      </div>
      
      {/* Reporte */}
      {reporte && (
          <div style={{
            backgroundColor: "#fefefe",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "350px"
          }}>
            <h3>📊 Reporte de predicciones</h3>
            <p><strong>Fecha última predicción:</strong><br />{reporte.fecha_ultima_prediccion || "Sin datos"}</p>

            <p><strong>Totales por categoría:</strong></p>
            <ul style={{ color: "#000" }}>
              {Object.entries(reporte.total_por_categoria).map(([categoria, total]) => (
                <li key={categoria}>{categoria}: {total}</li>
              ))}
            </ul>

            <p><strong>Últimas 5 predicciones:</strong></p>
            <ul style={{ color: "#000" }}>
              {reporte.ultimas_5.map((pred: any, index: number) => (
                <li key={index}>{pred.resultado} ({new Date(pred.fecha).toLocaleString()})</li>
              ))}
            </ul>
          </div>
        )}
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