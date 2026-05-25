from fastapi import Request

from database.manga import MangaGateway
from middlewares.session import validateSession


class MangaInfoHandler:

    @staticmethod
    @validateSession
    def get(request: Request, data: dict):
        mangaId = data["mangaId"]
        manga = MangaGateway.getById(mangaId=mangaId)

        return {"manga": manga}
    