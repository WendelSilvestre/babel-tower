import random
import string

from database.connection import Base
from sqlalchemy import Column, String, JSON


def generate_id():
    return ''.join(random.choices(string.digits, k=16))


class MangaCounter(Base):
    __tablename__ = "manga_counter"

    id = Column(String, primary_key=True, default=generate_id, index=True)
    mangaId = Column(String, index=True)
    userId = Column(String, index=True)
    volumesOwned = Column(JSON)
    imageUrl = Column(String, index=True)
