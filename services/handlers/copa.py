from fastapi import Request

from database.copa import CopaGateway
from middlewares.user import validateUserId
from middlewares.copa import validateCopaId
from middlewares.session import validateSession


class CopaHandler:

    @staticmethod
    @validateSession
    @validateUserId
    @validateCopaId
    def patch(request: Request, body: dict):
        copaId = body["copaId"]
        owned = body["owned"]

        copa = CopaGateway.update(copaId=copaId, owned=owned)

        return {"copa": copa}

    @staticmethod
    @validateSession
    @validateUserId
    def get(request: Request, body: dict):
        userId = body["userId"]
        copaCards = CopaGateway.getByUserId(userId=userId)

        if not copaCards:
            copa = CopaGateway.create(userId=userId)
        else:
            copa = copaCards[0]

        return {"copa": copa}
    