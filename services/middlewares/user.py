from fastapi import HTTPException
from utils.parameters import validateParameters

def validateUserParameters(func):
    def wrapper(self, body):
        
        errors = validateParameters(
            body=body,
            required=["email", "password", "name"],
        )
        if errors:
            raise HTTPException(status_code=400, detail=errors)

        return func(self, body)
    return wrapper()
