from models.copa import Copa
from database.connection import SessionLocal


class CopaGateway:

    @staticmethod
    def create(userId: str, year: int = 2026, owned: dict = {}):
        with SessionLocal() as db:
            copa = Copa(
                year=year,
                owned=owned,
                userId=userId
            )
            db.add(copa)
            db.commit()
            db.refresh(copa)
            return copa
        return

    @staticmethod
    def getAll():
        with SessionLocal() as db:
            return db.query(Copa).all()

    @staticmethod
    def getById(copaId: str):
        with SessionLocal() as db:
            return db.query(Copa).filter(Copa.id == copaId).first()

    @staticmethod
    def getByUserId(userId: str):
        with SessionLocal() as db:
            return db.query(Copa).filter(Copa.userId == userId).all()

    @staticmethod
    def update(copaId: str, owned: dict):
        with SessionLocal() as db:
            copa = db.query(Copa).filter(Copa.id == copaId).first()
            if copa:
                copa.owned = {**(copa.owned or {}), **owned}
                db.commit()
                db.refresh(copa)
                return copa
            return None
