from sqlalchemy.orm import Session
from models.user import User
from database.connection import SessionLocal


class UserGateway:

    @staticmethod
    def create(name:str, email: str, password: str):
        # with SessionLocal() as db:
        #     user = User(name=name, email=email, password=password)
        #     db.add(user)
        #     db.commit()
        #     db.refresh(user)
        #     return user
        return

    @staticmethod
    def getAll():
        with SessionLocal() as db:
            return db.query(User).all()
