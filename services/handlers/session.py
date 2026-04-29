from bcrypt import checkpw
from fastapi import HTTPException

from database.user import UserGateway
from database.session import SessionGateway


class SessionHandler:

    @staticmethod
    def post(body: dict):
        email = body["email"]
        password = body["password"]

        user = UserGateway.getEmail(email=email)
        if not user:
            raise HTTPException(status_code=400, detail="Error getting user")
        
        if not checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
            raise HTTPException(status_code=400, detail="Error password")

        session = SessionGateway.create(userId=user.id)

        return {"session": session}
