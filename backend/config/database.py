from pymongo import MongoClient
from decouple import config
import gridfs


uri = config("uri")
client = MongoClient(uri)

# Seller DB
db = client.user_db
users = db["user_collections"]

# Product DB
products_db = client.product_db
products = products_db["product_collections"]

# products.create_index([("product_title", "text")])

fs = gridfs.GridFS(products_db)

# Bundle DB
bundle_db = client.bundle_db
bundles = bundle_db["bundle_collections"]


tag_db = client.tag_db
tags = tag_db["tag_collections"]