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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en entorno controlado puedes usar * por ahora
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


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

@app.post("/predict")
def predict(data: InputData):
    sintomas_graves = sum([
        data.ictericia,
        data.hinchazon_abdominal,
        data.confusion,
    ])

    sintomas_moderados = sum([
        data.dolor_abdominal,
        data.fatiga_extrema,
        data.orina_oscura,
        data.heces_palidas
    ])

    total_sintomas = sintomas_graves + sintomas_moderados

    if total_sintomas == 0 and data.edad < 60 and data.peso > 45:
        resultado = "NO ENFERMO"
    elif sintomas_moderados >= 1 and sintomas_graves == 0:
        resultado = "ENFERMEDAD LEVE"
    elif sintomas_moderados >= 2 and sintomas_graves == 1:
        resultado = "ENFERMEDAD AGUDA"
    elif sintomas_graves >= 2 or (data.edad >= 65 and sintomas_moderados >= 2):
        resultado = "ENFERMEDAD CRÓNICA"
    elif sintomas_graves == 3 or (data.confusion and data.edad >= 70 and data.peso < 50):
        resultado = "ENFERMEDAD TERMINAL"
    else:
        resultado = "NO ENFERMO"



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


#endpoint generacion reporte
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