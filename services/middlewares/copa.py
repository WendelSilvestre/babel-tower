from fastapi import HTTPException, Request

from database.copa import CopaGateway


def validateCopaId(func):
    def wrapper(request: Request, data: dict):
        copaId = data.get("copaId")
        if not copaId:
            raise HTTPException(status_code=400, detail="copaId is required")

        copa = CopaGateway.getById(copaId)
        if not copa:
            raise HTTPException(status_code=404, detail="Copa not found")

        return func(request, data)
    return wrapper
