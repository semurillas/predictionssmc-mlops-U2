from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
import json

app = FastAPI()

# Ruta del archivo persistente
ruta_archivo = "data/predicciones.json"

# Crear directorio y archivo si no existen
if not os.path.exists("data"):
    os.makedirs("data")
if not os.path.exists(ruta_archivo):
    with open(ruta_archivo, "w") as f:
        json.dump([], f)

# Habilitar CORS para permitir acceso desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# ------------------------
# MODELO DE ENTRADA
# ------------------------
class InputData(BaseModel):
    edad: int
    peso: float
    ictericia: bool = False
    dolor_abdominal: bool = False
    fatiga_extrema: bool = False
    hinchazon_abdominal: bool = False
    confusion: bool = False
    orina_oscura: bool = False
    heces_palidas: bool = False

# ------------------------
# LÓGICA CENTRAL DE PREDICCIÓN (REUTILIZABLE)
# ------------------------
def evaluar_prediccion(edad: int, peso: float, sintomas: dict) -> str:
    sintomas_graves = sum([
        sintomas.get("ictericia", False),
        sintomas.get("hinchazon_abdominal", False),
        sintomas.get("confusion", False),
    ])

    sintomas_moderados = sum([
        sintomas.get("dolor_abdominal", False),
        sintomas.get("fatiga_extrema", False),
        sintomas.get("orina_oscura", False),
        sintomas.get("heces_palidas", False)
    ])

    total_sintomas = sintomas_graves + sintomas_moderados

    if total_sintomas == 0 and edad < 60 and peso > 45:
        return "NO ENFERMO"
    elif sintomas_moderados >= 1 and sintomas_graves == 0:
        return "ENFERMEDAD LEVE"
    elif sintomas_moderados >= 2 and sintomas_graves == 1:
        return "ENFERMEDAD AGUDA"
    elif sintomas_graves >= 2 or (edad >= 65 and sintomas_moderados >= 2):
        return "ENFERMEDAD CRÓNICA"
    elif sintomas_graves == 3 or (sintomas.get("confusion") and edad >= 70 and peso < 50):
        return "ENFERMEDAD TERMINAL"
    else:
        return "NO ENFERMO"

# ------------------------
# ENDPOINT /predict
# ------------------------
@app.post("/predict")
def predict(data: InputData):
    sintomas = {
        "ictericia": data.ictericia,
        "dolor_abdominal": data.dolor_abdominal,
        "fatiga_extrema": data.fatiga_extrema,
        "hinchazon_abdominal": data.hinchazon_abdominal,
        "confusion": data.confusion,
        "orina_oscura": data.orina_oscura,
        "heces_palidas": data.heces_palidas
    }

    resultado = evaluar_prediccion(data.edad, data.peso, sintomas)

    nueva_prediccion = {
        "resultado": resultado,
        "fecha": datetime.now().isoformat()
    }

    with open(ruta_archivo, "r+") as f:
        predicciones = json.load(f)
        predicciones.append(nueva_prediccion)
        f.seek(0)
        json.dump(predicciones, f, indent=2)

    return {"resultado": resultado}

# ------------------------
# ENDPOINT /reporte
# ------------------------
@app.get("/reporte")
def reporte():
    if not os.path.exists(ruta_archivo):
        return {"mensaje": "No hay predicciones registradas aún."}

    with open(ruta_archivo, "r") as f:
        predicciones = json.load(f)

    total_por_categoria = {}
    for pred in predicciones:
        total_por_categoria[pred["resultado"]] = total_por_categoria.get(pred["resultado"], 0) + 1

    ultimas_5 = predicciones[-5:][::-1]
    ultima_fecha = predicciones[-1]["fecha"] if predicciones else None

    return {
        "total_por_categoria": total_por_categoria,
        "ultimas_5": ultimas_5,
        "fecha_ultima_prediccion": ultima_fecha
    }