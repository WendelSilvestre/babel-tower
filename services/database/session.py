from datetime import datetime, timedelta

from models.session import Session, SessionStatus
from database.connection import SessionLocal


class SessionGateway:

    @staticmethod
    def create(userId: str, expiration=259200):
        with SessionLocal() as db:
            session = Session(
                userId=userId,
                expiration=datetime.now() + timedelta(seconds=expiration),
                status=SessionStatus.active
            )
            db.add(session)
            db.commit()
            db.refresh(session)
            return session
        return

    @staticmethod
    def getAll():
        with SessionLocal() as db:
            return db.query(Session).all()
