from fastapi import APIRouter
from handlers.helloWorld import HelloWorldHandler
# from ..handlers.helloWorld import HelloWorldHandler

router = APIRouter()

@router.get("/hello-world")
async def helloGet():
    return HelloWorldHandler.get()