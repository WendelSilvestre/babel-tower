from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models.user
from routes.routes import router
from database.connection import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/babel-tower")
