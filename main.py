from fastapi import FastAPI
from route.routes import router
from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

app = FastAPI()

app.include_router(router)

# uri = "mongodb+srv://saais_admin:ZA81qfDASREEZ5qD@saaisdb.dyhcbgz.mongodb.net/?retryWrites=true&w=majority"

# client = MongoClient(uri)

# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)