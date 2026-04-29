from fastapi import APIRouter, Request

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
    return UserHandler.post(body)

@router.post("/session")
async def sessionPost(request: Request):
    body = await request.json()
    return SessionHandler.post(body)
