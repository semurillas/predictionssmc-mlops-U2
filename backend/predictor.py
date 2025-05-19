# Funcion prueba
def evaluar_prediccion(edad, peso, sintomas: dict) -> str:
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
    elif sintomas_graves == 3 or (sintomas.get("confusion") and edad >= 70 and peso < 50):
        return "ENFERMEDAD TERMINAL"
    elif sintomas_graves >= 2 or (edad >= 65 and sintomas_moderados >= 2):
        return "ENFERMEDAD CRÓNICA"
    else:
        return "NO ENFERMO"
    

    