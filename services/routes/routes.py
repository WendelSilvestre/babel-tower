from fastapi import APIRouter, Request

from handlers.copa import CopaHandler
from handlers.user import UserHandler
from handlers.session import SessionHandler
from handlers.helloworld import HelloWorldHandler


router = APIRouter()


@router.get("/hello-world")
async def helloGet():
    return HelloWorldHandler.get()


@router.post("/user")
async def userPost(request: Request):
    body = await request.json()
    return UserHandler.post(request, body)

@router.post("/session")
async def sessionPost(request: Request):
    body = await request.json()
    return SessionHandler.post(request, body)

@router.delete("/session/{sessionId}")
async def sessionDelete(request: Request, sessionId: str):
    return SessionHandler.delete(request, {"sessionId": sessionId})

@router.get("/copa")
async def copaGet(request: Request):
    body = dict(request.query_params)
    return CopaHandler.get(request, body)

@router.patch("/copa")
async def copaPatch(request: Request):
    body = await request.json()
    return CopaHandler.patch(request, body)
