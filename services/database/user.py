from sqlalchemy.orm import Session
from models.user import User
from database.connection import SessionLocal


class UserGateway:

    @staticmethod
    def create(email: str):
        with SessionLocal() as db:
            user = User(email=email)
            db.add(user)
            db.commit()
            db.refresh(user)
            return user

    @staticmethod
    def getAll():
        with SessionLocal() as db:
            return db.query(User).all()
