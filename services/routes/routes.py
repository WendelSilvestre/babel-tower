from fastapi import APIRouter, Request

from handlers.copa import CopaHandler
from handlers.user import UserHandler
from handlers.manga import MangaHandler
from handlers.session import SessionHandler
from handlers.mangaInfo import MangaInfoHandler
from handlers.helloworld import HelloWorldHandler
from handlers.mangaCounter import MangaCounterHandler 


router = APIRouter()


@router.get("/hello-world")
async def helloGet():
    return HelloWorldHandler.get()


@router.post("/user")
async def userPost(request: Request):
    data = await request.json()
    return UserHandler.post(request, data)

@router.post("/session")
async def sessionPost(request: Request):
    data = await request.json()
    return SessionHandler.post(request, data)

@router.delete("/session/{sessionId}")
async def sessionDelete(request: Request, sessionId: str):
    return SessionHandler.delete(request, {"sessionId": sessionId})

@router.get("/copa")
async def copaGet(request: Request):
    data = dict(request.query_params)
    return CopaHandler.get(request, data)

@router.patch("/copa")
async def copaPatch(request: Request):
    data = await request.json()
    return CopaHandler.patch(request, data)

@router.get("/manga")
async def mangaGetAll():
    return MangaHandler.get()

@router.get("/manga/{mangaId}")
async def mangaGet(request: Request, mangaId: str):
    return MangaInfoHandler.get(request, {"mangaId": mangaId})

@router.post("/manga")
async def mangaPost(request: Request):
    data = await request.json()
    return MangaHandler.post(request, data)

@router.get("/manga-counter")
async def mangaCounterGet(request: Request):
    data = dict(request.query_params)
    return MangaCounterHandler.get(request, data)

@router.post("/manga-counter")
async def mangaCounterPost(request: Request):
    data = await request.json()
    return MangaCounterHandler.post(request, data)

@router.patch("/manga-counter")
async def mangaCounterPatch(request: Request):
    data = await request.json()
    return MangaCounterHandler.patch(request, data)
