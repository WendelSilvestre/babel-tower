from datetime import datetime

from fastapi import HTTPException, Request

from database.session import SessionGateway
from models.session import SessionStatus


def validateSession(func):
    def wrapper(request: Request, data: dict):
        sessionId = request.headers.get("session")
        if not sessionId:
            raise HTTPException(status_code=401, detail="Session header is required")

        session = SessionGateway.getById(sessionId=sessionId)
        if not session:
            raise HTTPException(status_code=401, detail="Session not found")

        if session.status != SessionStatus.active or session.expiration < datetime.now():
            raise HTTPException(status_code=401, detail="Session is invalid or expired")

        return func(request, data)
    return wrapper
