import random
import string

from sqlalchemy import Column, Integer, String, JSON
from database.connection import Base


def generate_id():
    return ''.join(random.choices(string.digits, k=16))


class Copa(Base):
    __tablename__ = "copa"

    id = Column(String, primary_key=True, default=generate_id, index=True)
    year = Column(Integer, default=2026, index=True)
    owned = Column(JSON, index=True)
    userId = Column(String, index=True)
