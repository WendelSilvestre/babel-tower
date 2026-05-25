from fastapi import HTTPException, Request

from middlewares.user import validateUserId
from middlewares.session import validateSession
from database.mangaCounter import MangaCounterGateway


class MangaCounterHandler:

    @staticmethod
    @validateSession
    @validateUserId
    def get(request: Request, data: dict):
        userId = data["userId"]
        mangaCounters = MangaCounterGateway.getByUserId(userId=userId)

        return {"mangaCounters": mangaCounters}

    @staticmethod
    @validateSession
    @validateUserId
    #TODO validate mangaId
    def post(request: Request, data: dict):
        mangaId = data["mangaId"]
        userId = data["userId"]
        imageUrl = data["imageUrl"]

        mangaCounter = MangaCounterGateway.getByUserIdAndMangaId(userId=userId, mangaId=mangaId)
        if mangaCounter:
            return {"mangaCounter": mangaCounter}

        mangaCounter = MangaCounterGateway.create(
            mangaId=mangaId,
            userId=userId,
            imageUrl=imageUrl
        )

        return {"mangaCounter": mangaCounter}

    @staticmethod
    @validateSession
    @validateUserId
    def patch(request: Request, data: dict):
        counterId = data["counterId"]
        volumesOwned = data["volumesOwned"]

        mangaCounter = MangaCounterGateway.update(counterId=counterId, volumesOwned=volumesOwned)
        if not mangaCounter:
            raise HTTPException(status_code=404, detail="Manga counter not found")

        return {"mangaCounter": mangaCounter}
