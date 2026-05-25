from fastapi import HTTPException, Request

from database.user import UserGateway
from utils.parameters import validateParameters


def validateUserParameters(func):
    def wrapper(request: Request, body: dict):
        errors = validateParameters(
            body=body,
            required=["email", "password", "name"],
        )
        if errors:
            raise HTTPException(status_code=400, detail=errors)

        return func(request, body)
    return wrapper


def validateUserId(func):
    def wrapper(request: Request, body: dict):
        userId = body.get("userId")
        if not userId:
            raise HTTPException(status_code=400, detail="UserId is required")

        user = UserGateway.getById(userId)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return func(request, body)
    return wrapper
