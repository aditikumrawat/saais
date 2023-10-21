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

fs = gridfs.GridFS(products_db)

# Bundle DB
bundle_db = client.bundle_db
<<<<<<< HEAD
bundles = bundle_db["bundle_collections"]
=======
bundles = bundle_db["bundle_collections"]
>>>>>>> 0df45d0e143ac6cebe2bf4e96e5dc855802e6667
