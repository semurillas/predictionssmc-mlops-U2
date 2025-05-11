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
    presion: float

@app.post("/predict")
def predict(data: InputData):
    if data.edad > 50 and data.presion > 140:
        return {"resultado": "Riesgo ALTO de enfermedad cardiovascular"}
    elif data.peso > 100:
        return {"resultado": "Riesgo MEDIO de enfermedad cardiovascular"}
    else:
        return {"resultado": "Riesgo BAJO de enfermedad cardiovascular"}