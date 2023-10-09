from pymongo import MongoClient
from decouple import config

uri = config("uri")
client = MongoClient(uri)

db = client.user_db
collection_name = db["user_collections"]
