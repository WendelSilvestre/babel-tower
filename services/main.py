from fastapi import FastAPI
import models.user
from routes.routes import router
from database.connection import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(router, prefix="/babel-tower")
