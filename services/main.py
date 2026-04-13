from fastapi import FastAPI
# from app.api.v1.routes import router as api_router
from routes.routes import router

app = FastAPI()
app.include_router(router, prefix="/babel-tower")