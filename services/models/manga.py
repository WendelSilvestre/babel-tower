import random
import string

from database.connection import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY


def generate_id():
    return ''.join(random.choices(string.digits, k=16))


class Manga(Base):
    __tablename__ = "manga"

    id = Column(String, primary_key=True, default=generate_id, index=True)
    name = Column(String, index=True)
    totalVolumes = Column(Integer, index=True)
    keyWords = Column(ARRAY(String), index=True)
