from models.manga import Manga
from database.connection import SessionLocal


class MangaGateway:

    @staticmethod
    def create(name: str, totalVolumes: int, keyWords: list = []):
        with SessionLocal() as db:
            manga = Manga(
                name=name,
                totalVolumes=totalVolumes,
                keyWords=keyWords
            )
            db.add(manga)
            db.commit()
            db.refresh(manga)
            return manga
        return

    @staticmethod
    def getAll():
        with SessionLocal() as db:
            return db.query(Manga).all()

    @staticmethod
    def getById(mangaId: str):
        with SessionLocal() as db:
            return db.query(Manga).filter(Manga.id == mangaId).first()

    @staticmethod
    def getByName(name: str):
        with SessionLocal() as db:
            return db.query(Manga).filter(Manga.name == name).first()

    @staticmethod
    def update(mangaId: str, totalVolumes: int, keyWords: list):
        with SessionLocal() as db:
            manga = db.query(Manga).filter(Manga.id == mangaId).first()
            if not manga:
                return None
            manga.totalVolumes = totalVolumes
            manga.keyWords = keyWords
            db.commit()
            db.refresh(manga)
            return manga
