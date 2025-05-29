
# Reestructuración del Pipeline MLOps para Predicción de Enfermedades

## Etapa de Diseño: Entrada y Preparación de Datos

La etapa de diseño define los fundamentos sobre los cuales se construye la solución, priorizando la calidad de los datos, la seguridad y la preparación adecuada antes de alimentar el modelo de predicción.

### Restricciones y características de los datos

Dado que se trata de datos médicos, se deben tener en cuenta las siguientes limitaciones:

- **Datos desbalanceados**: la mayoría de los registros estarán asociados a enfermedades comunes, mientras que las enfermedades huérfanas estarán representadas en cantidades mínimas. Esto puede sesgar el aprendizaje del modelo.
- **Datos sensibles**: los datos personales y clínicos deben ser tratados con confidencialidad, por lo cual se aplicarán estrategias de anonimización y se garantizará la transmisión mediante protocolos seguros como HTTPS.
- **Presencia de datos nulos o mal etiquetados**: es común encontrar síntomas faltantes o inconsistentes en los registros. Esto requiere un proceso de validación riguroso, complementado con imputación estadística o revisión de expertos.

### Tipos de datos a considerar

- **Estructurados**: campos como edad, peso y síntomas codificados binariamente (presencia/ausencia).
- **No estructurados (en etapas futuras)**: comentarios clínicos o notas médicas en texto libre, que pueden enriquecer el análisis mediante NLP.

### Acciones de preprocesamiento y definición de estructura

- **Validación de datos nulos**: se establecen reglas clínicas para definir si una entrada incompleta puede ser completada (mediante imputación por moda o media) o descartada. La intervención de expertos es clave en casos críticos.

- **Tratamiento y transformación de datos**:
  - **Codificación**: los síntomas se representan con One-Hot Encoding.
  - **Imputación**: síntomas ausentes o mal registrados se corrigen.
  - **Embeddings (opcional)**: si se incorporan características categóricas complejas o textuales, se usarán embeddings.

- **Tratamiento del desbalance de clases**:
  - Se aplicará SMOTE o ADASYN.
  - Se considerará transfer learning con datasets externos más completos.

- **Definición de la estructura de datos final**:
  - Se estandariza en un formato tabular validado con `pydantic` o `jsonschema`.

### Infraestructura de almacenamiento

- **Amazon S3** para datos brutos.
- **Amazon Redshift** para datos transformados.
- **DVC** para versionado de datasets.

### Justificación de tecnologías

- **pandas**: manipulación y análisis exploratorio.
- **FastAPI + pydantic**: validación eficiente y esquema de entrada.
- **imblearn**: técnicas de balanceo como SMOTE.
- **DVC**: reproducibilidad y trazabilidad.
- **S3 + Redshift**: almacenamiento escalable y eficiente.

## Etapa de Desarrollo: Ingesta, Modelado y Evaluación

### 3.1 Ingesta de datos y almacenamiento

- **Fuentes internas**: registros clínicos estructurados.
- **Fuentes externas**: datasets de enfermedades raras.
- Almacenamiento en **S3** y transformación final en **Redshift**.
- **DVC** asegura trazabilidad y reproducibilidad.

### 3.2 Análisis exploratorio y Feature Engineering

- Herramientas: **pandas**, **seaborn**, **Jupyter Notebooks**.
- Detección de valores atípicos, correlaciones, inconsistencias.
- Transformaciones, interacciones, PCA (si aplica).

### 3.3 Entrenamiento del modelo

- Modelos: **Random Forest**, **XGBoost**.
- Validación: **k-fold cross-validation**, tuning con **GridSearchCV** o **Optuna**.

### 3.4 Evaluación y comparación

- Métricas: **ROC AUC**, **F1-score**, **matriz de confusión**, tiempo de inferencia, uso de memoria.
- Validación clínica por expertos.

### 3.5 Visualización y documentación

- Herramientas: **Streamlit**, **matplotlib**.
- Opcional: **MLflow**, **Tableau**.

### 3.6 Validación técnica y ciclo iterativo

- Validación funcional y técnica.
- Iteración con nuevos datos o ajustes si no cumple con criterios establecidos.

## Etapa de Producción

### 4.1 Despliegue del modelo

- **Docker + FastAPI** para empaquetado y exposición como API.
- Servidores: **Uvicorn** local o servicios como **Render**, **EC2**, **Railway**.
- Orquestación: **Docker Compose**, **Kubernetes**.

### 4.2 Generación de predicciones

- Predicciones almacenadas en archivos `.json` o `.txt`.
- Endpoint `/reporte` expone conteos, últimas predicciones y fecha.

### 4.3 Monitoreo del sistema

- Infraestructura: **Prometheus + Grafana**.
- Modelo: evaluación diaria de métricas clave, detección de `data drift`.

### 4.4 Reentrenamiento automático

- Nuevos datos en S3.
- Orquestación del retrain con **Apache Airflow**.
- Evaluación comparativa, promoción automática si supera umbrales.

### 4.5 Tecnologías empleadas

- **FastAPI**, **Docker**, **Kubernetes**, **Prometheus**, **Grafana**, **Airflow**, **S3**, **Redshift**.

## CHANGELOG

| Cambio                  | Propuesta Original     | Propuesta Actual                                       |
|------------------------|------------------------|--------------------------------------------------------|
| Almacenamiento de datos| No especificado        | S3 para datasets, Redshift para estructurados          |
| Tecnologías por etapa  | Mencionadas superficialmente | Justificadas y detalladas                      |
| Métricas de validación | No definidas           | ROC AUC, F1-score, matriz de confusión                |
| Escenarios de ejecución| Solo nube              | Nube o local según recursos del médico                 |
| Monitoreo del modelo   | No presente            | Monitoreo activo con Prometheus + reentrenamiento     |
| Validación de calidad  | Implícita              | Umbrales definidos + pruebas unitarias                |
| Iteración de modelos   | No contemplada         | Flujo iterativo documentado                           |
| Ingesta de nuevos datos| Manual o ausente       | Automatizada con Airflow                              |
