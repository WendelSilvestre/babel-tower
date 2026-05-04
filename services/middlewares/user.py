from fastapi import HTTPException

from database.user import UserGateway
from utils.parameters import validateParameters


def validateUserParameters(func):
    def wrapper(body: dict):
        errors = validateParameters(
            body=body,
            required=["email", "password", "name"],
        )
        if errors:
            raise HTTPException(status_code=400, detail=errors)

        return func(body)
    return wrapper


def validateUserId(func):
    def wrapper(body: dict):
        userId = body.get("userId")
        if not userId:
            raise HTTPException(status_code=400, detail="UserId is required")

        user = UserGateway.getById(userId)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return func(body)
    return wrapper
