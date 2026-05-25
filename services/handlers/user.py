from bcrypt import hashpw, gensalt
from fastapi import Request

from database.user import UserGateway
from middlewares.user import validateUserParameters


class UserHandler:

    @staticmethod
    @validateUserParameters
    def post(request: Request, data: dict):
        name = data["name"]
        email = data["email"]
        password = data["password"]

        hashedPassword = hashpw(password.encode("utf-8"), gensalt()).decode("utf-8")

        user = UserGateway.create(
            name=name,
            email=email,
            password=hashedPassword,
        )

        return {"user": user}

    @staticmethod
    def get():
        users = UserGateway.getAll()
        return [{"id": user.id, "email": user.email} for user in users]
