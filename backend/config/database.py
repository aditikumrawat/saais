from pymongo import MongoClient
from decouple import config
import gridfs


uri = config("uri")
client = MongoClient(uri)

# Seller DB
db = client.db
users = db["user_collections"]

# Product DB
products = db["product_collections"]

fs = gridfs.GridFS(db)

# Bundle DB
bundles = db["bundle_collections"]

# Review DB 
reviews = db["review_collections"]

# Rating DB
ratings = db["rating_collections"]

# Tags DB
tags = db["tag_collections"]
