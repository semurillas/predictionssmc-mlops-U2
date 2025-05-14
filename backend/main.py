from typing import Union

from fastapi import FastAPI

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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

    return {"resultado": resultado}