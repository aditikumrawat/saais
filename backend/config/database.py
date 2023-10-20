from pymongo import MongoClient
from decouple import config
import gridfs


uri = config("uri")
client = MongoClient(uri)

# Seller DB
db = client.user_db
collection_name = db["user_collections"]

# Product DB
products_db = client.product_db
products = products_db["product_collection"]

fs = gridfs.GridFS(products_db)
