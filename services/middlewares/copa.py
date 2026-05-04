from http.client import HTTPException

from services.database.copa import CopaGateway


def validateCopaId(func):
    def wrapper(body: dict):
        copaId = body.get("copaId")
        if not copaId:
            raise HTTPException(status_code=400, detail="copaId is required")

        copa = CopaGateway.getById(copaId)
        if not copa:
            raise HTTPException(status_code=404, detail="Copa not found")

        return func(copaId)
    return wrapper
