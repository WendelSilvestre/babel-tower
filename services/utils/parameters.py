

def validateParameters(required: list, body: dict):
    missing = [field for field in required if field not in body]

    if missing:
        return f"Parametros faltando: {", ".join(missing)}"
    
    return 
