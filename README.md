HEAD
# 🩺 Proyecto MLOps – Predicción de Enfermedades

## 📦 Nombre del proyecto: `predictionsmlops`

---

## 🧠 Descripción

Este repositorio contiene un proyecto de Machine Learning orientado a la predicción del estado de salud de pacientes, a partir de síntomas básicos registrados. La aplicación evalúa los datos de entrada y retorna un diagnóstico estimado, clasificado en uno de los siguientes cinco niveles de severidad:

- **NO ENFERMO**
- **ENFERMEDAD LEVE**
- **ENFERMEDAD AGUDA**
- **ENFERMEDAD CRÓNICA**
- **ENFERMEDAD TERMINAL**

El objetivo del proyecto es ofrecer una solución sencilla, escalable y modular, que sirva como base para construir un pipeline completo de MLOps que permita integrar entrenamiento, pruebas automáticas, despliegue continuo y monitoreo del modelo.

---

## ⚙️ Tecnologías utilizadas

- **Frontend**: [Next.js](https://nextjs.org/)
  - Framework moderno para interfaces gráficas rápidas, reactivas y modulares.
- **Backend / API**: [FastAPI](https://fastapi.tiangolo.com/)
  - Framework de alto rendimiento en Python para la construcción de APIs RESTful.
- **Modelo de ML**: Python (estructura de predicción basada en rangos)
- **Contenerización**: [Docker](https://www.docker.com/)
  - Permite ejecutar tanto el backend como el frontend en contenedores independientes, facilitando el despliegue y la portabilidad.

---

## 🚀 Objetivo técnico

Este proyecto busca consolidarse como una base funcional para construir un pipeline de MLOps completo, incorporando gradualmente:

- **Pruebas unitarias**
- **Integración continua (CI)**
- **Entrega continua (CD)**
- **Versionado de modelos y control de datos**
- **Monitoreo de rendimiento**

---

## 📁 Estructura general del proyecto

```plaintext
📦 predictionsmlops/
├── backend/                    # Código del modelo y la API FastAPI
│   ├── app/
│   └── Dockerfile
├── frontend/                   # Interfaz de usuario con Next.js
│   └── Dockerfile
├── docker-compose.yml          # Orquestación de contenedores
├── README.md
└── requirements.txt

## 🐳 Cómo desplegar el proyecto con Docker

### ✅ Requisitos previos

- Tener instalado [Docker](https://www.docker.com/products/docker-desktop)
- Tener instalado [Docker Compose](https://docs.docker.com/compose/) si tu versión de Docker no lo trae incluido

---

### 🚀 Despliegue con un solo comando

Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up --build


### Para detener la aplicacion ejecuta:

docker-compose down