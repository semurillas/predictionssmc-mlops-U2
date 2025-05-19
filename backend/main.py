from typing import Union

from fastapi import FastAPI

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from predictor import evaluar_prediccion

app = FastAPI()

# Permitir CORS desde el frontend (Next.js)
#app.add_middleware(
 #   CORSMiddleware,
  #  allow_origins=["http://localhost:3000"],  # frontend local
   # allow_methods=["*"],
    #allow_headers=["*"],
#)

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
    return {"resultado": resultado}