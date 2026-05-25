import sys
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.routes import router
from database.connection import engine, Base

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/babel-tower")
