from predictor import evaluar_prediccion

def test_prediccion_leve():
    resultado = evaluar_prediccion(30, 70, {
        "ictericia": False,
        "dolor_abdominal": True,
        "fatiga_extrema": False,
        "hinchazon_abdominal": False,
        "confusion": False,
        "orina_oscura": False,
        "heces_palidas": False
    })
    assert resultado == "ENFERMEDAD LEVE"

def test_prediccion_terminal():
    resultado = evaluar_prediccion(75, 45, {
        "ictericia": True,
        "dolor_abdominal": True,
        "fatiga_extrema": True,
        "hinchazon_abdominal": True,
        "confusion": True,
        "orina_oscura": True,
        "heces_palidas": True
    })
    assert resultado == "ENFERMEDAD TERMINAL"