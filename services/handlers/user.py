from database.user import UserGateway


class UserHandler:

    @staticmethod
    def post(email: str):
        user = UserGateway.create(email=email)
        return {"id": user.id, "email": user.email}

    @staticmethod
    def get():
        users = UserGateway.getAll()
        return [{"id": user.id, "email": user.email} for user in users]
