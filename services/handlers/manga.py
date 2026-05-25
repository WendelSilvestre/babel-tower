from fastapi import Request

from database.manga import MangaGateway
from middlewares.session import validateSession


class MangaHandler:

    @staticmethod
    def get():
        mangas = MangaGateway.getAll()

        return {"mangas": mangas}
    
    @staticmethod
    @validateSession
    def post(request: Request, data: dict):
        name = data["name"].lower()
        totalVolumes = data["totalVolumes"]
        keyWords = data.get("keyWords", [])

        manga = MangaGateway.getByName(name=name)
        if manga:
            return {"manga": manga}
        
        manga = MangaGateway.create(
            name=name,
            totalVolumes=totalVolumes,
            keyWords=keyWords
        )

        return {"manga": manga}
