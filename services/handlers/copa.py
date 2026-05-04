from database.copa import CopaGateway
from middlewares.user import validateUserId
from middlewares.copa import validateCopaId


class CopaHandler:

    @staticmethod
    @validateUserId
    @validateCopaId
    def patch(body: dict):
        copaId = body["copaId"]
        owned = body["owned"]
        
        copa = CopaGateway.update(copaId=copaId, owned=owned)

        return {"copa": copa}

    @staticmethod
    @validateUserId
    #TODO Change userId to be queryParameter and not body parameter
    def get(body: dict):
        userId = body["userId"]
        copaCards = CopaGateway.getByUserId(userId=userId)

        if not copaCards:
            copa = CopaGateway.create(userId=userId)
        else:
            copa = copaCards[0]

        return {"copa": copa}
    