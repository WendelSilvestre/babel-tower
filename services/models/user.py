from sqlalchemy import Column, Integer, String
from database.connection import Base
import random
import string


def generate_id():
    return ''.join(random.choices(string.digits, k=16))


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, default=generate_id, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
