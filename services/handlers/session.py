from bcrypt import checkpw
from fastapi import HTTPException, Request

from database.user import UserGateway
from database.session import SessionGateway
from middlewares.session import validateSession


class SessionHandler:

    @staticmethod
    def post(request: Request, body: dict):
        email = body["email"]
        password = body["password"]

        user = UserGateway.getEmail(email=email)
        if not user:
            raise HTTPException(status_code=400, detail="Error getting user")

        if not checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
            raise HTTPException(status_code=400, detail="Error password")

        session = SessionGateway.create(userId=user.id)

        return {"session": session, "user": {"id": user.id, "name": user.name, "email": user.email}}

    @staticmethod
    @validateSession
    def delete(request: Request, body: dict):
        sessionId = body["sessionId"]
        session = SessionGateway.delete(sessionId=sessionId)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        return {"session": session}
