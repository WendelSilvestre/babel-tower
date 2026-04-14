from fastapi import APIRouter, Request
from handlers.user import UserHandler
from handlers.helloworld import HelloWorldHandler

router = APIRouter()


@router.get("/hello-world")
async def helloGet():
    return HelloWorldHandler.get()


@router.post("/user")
async def userPost(request: Request):
    body = await request.json()
    return UserHandler.post(email=body["email"])


@router.get("/user")
async def userGetAll():
    return UserHandler.get_all()
