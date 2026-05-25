from fastapi import HTTPException, Request

from database.user import UserGateway
from utils.parameters import validateParameters


def validateUserParameters(func):
    def wrapper(request: Request, data: dict):
        errors = validateParameters(
            data=data,
            required=["email", "password", "name"],
        )
        if errors:
            raise HTTPException(status_code=400, detail=errors)

        return func(request, data)
    return wrapper


def validateUserId(func):
    def wrapper(request: Request, data: dict):
        userId = data.get("userId")
        if not userId:
            raise HTTPException(status_code=400, detail="UserId is required")

        user = UserGateway.getById(userId)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return func(request, data)
    return wrapper
