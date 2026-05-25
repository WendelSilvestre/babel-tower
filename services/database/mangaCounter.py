from models.mangaCounter import MangaCounter
from database.connection import SessionLocal


class MangaCounterGateway:

    @staticmethod
    def create(mangaId: str, userId: str, imageUrl: str, volumesOwned: list = []):
        with SessionLocal() as db:
            mangaCounter = MangaCounter(
                mangaId=mangaId,
                userId=userId,
                imageUrl=imageUrl,
                volumesOwned=volumesOwned
            )
            db.add(mangaCounter)
            db.commit()
            db.refresh(mangaCounter)
            return mangaCounter
        return

    @staticmethod
    def getAll():
        with SessionLocal() as db:
            return db.query(MangaCounter).all()

    @staticmethod
    def getById(counterId: str):
        with SessionLocal() as db:
            return db.query(MangaCounter).filter(MangaCounter.id == counterId).first()

    @staticmethod
    def getByUserId(userId: str):
        with SessionLocal() as db:
            return db.query(MangaCounter).filter(MangaCounter.userId == userId).all()
        
    @staticmethod
    def getByUserIdAndMangaId(userId: str, mangaId: str):
        with SessionLocal() as db:
            return db.query(MangaCounter).filter(
                MangaCounter.userId == userId,
                MangaCounter.mangaId == mangaId,
            ).first()
    
    @staticmethod
    def update(counterId: str, volumesOwned: list):
        with SessionLocal() as db:
            counter = db.query(MangaCounter).filter(MangaCounter.id == counterId).first()
            if not counter:
                return None
            existing = counter.volumesOwned or []
            counter.volumesOwned = sorted(set(existing) | set(volumesOwned))
            db.commit()
            db.refresh(counter)
            return counter
