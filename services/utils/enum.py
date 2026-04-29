from enum import Enum

class BaseEnum(Enum):

    @classmethod
    def value(cls):
        return [e.value for e in cls]