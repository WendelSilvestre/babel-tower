from datetime import datetime, timedelta

from database.connection import SessionLocal
from models.session import Session, SessionStatus


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

    @staticmethod
    def delete(sessionId: str):
        with SessionLocal() as db:
            session = db.query(Session).filter(Session.id == sessionId).first()
            if not session:
                return None
            session.status = SessionStatus.expired
            db.commit()
            db.refresh(session)
            return session
