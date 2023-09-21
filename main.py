from pymongo.mongo_client import MongoClient
from fastapi import FastAPI
from route.routes import router

app = FastAPI()

app.include_router(router)