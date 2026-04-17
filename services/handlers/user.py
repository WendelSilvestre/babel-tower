from bcrypt import hashpw, gensalt
from database.user import UserGateway
from middlewares.user import validateUserParameters

class UserHandler:

    @staticmethod
    @validateUserParameters
    def post(body: dict):
        name = body["name"]
        email = body["email"]
        password = body["password"]

        hashedPassword = hashpw(password.encode("utf-8"), gensalt)

        user = UserGateway.create(
            name=name,
            email=email,
            password=hashedPassword,
        )

        return {"id": user.id, "email": user.email}

    @staticmethod
    def get():
        users = UserGateway.getAll()
        return [{"id": user.id, "email": user.email} for user in users]
