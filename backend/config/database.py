from pymongo import MongoClient
from decouple import config

uri = config("uri")
client = MongoClient(uri)

# Seller DB
db = client.user_db
collection_name = db["user_collections"]

# Product DB
products = db["product_collection"]
