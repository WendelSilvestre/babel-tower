import random
import string
from sqlalchemy import Column, String, DateTime

from utils.enum import BaseEnum
from database.connection import Base


def generate_id():
    return ''.join(random.choices(string.digits, k=16))


class SessionStatus(str, BaseEnum):

    active = "active"
    expired = "expired"



class Session(Base):
    __tablename__ = "session"

    id = Column(String, primary_key=True, default=generate_id, index=True)
    userId = Column(String, index=True)
    expiration = Column(DateTime, index=True)
    status = Column(String, index=True)
