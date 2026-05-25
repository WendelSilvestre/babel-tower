

def validateParameters(required: list, data: dict):
    missing = [field for field in required if field not in data]

    if missing:
        return f"Parametros faltando: {", ".join(missing)}"
    
    return 
