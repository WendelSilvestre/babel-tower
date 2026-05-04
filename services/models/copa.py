import random
import string

from database.connection import Base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import Column, Integer, String, Index


def generate_id():
    return ''.join(random.choices(string.digits, k=16))


class Copa(Base):
    __tablename__ = "copa"

    id = Column(String, primary_key=True, default=generate_id, index=True)
    year = Column(Integer, default=2026, index=True)
    owned = Column(JSONB)
    userId = Column(String, index=True)


Index('ix_copa_owned', Copa.owned, postgresql_using='gin', postgresql_ops={'owned': 'jsonb_ops'})
