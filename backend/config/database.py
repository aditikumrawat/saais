from pymongo import MongoClient
from decouple import config
import gridfs


uri = config("uri")
client = MongoClient(uri)

# Seller DB
db = client.db
users = db["user_collections"]

# Bundle DB
bundles = db["bundle_collections"]
bundles.create_index([("bundle_title", "text")])

# Review DB 
reviews = db["review_collections"]

# Rating DB
ratings = db["rating_collections"]

# Tags DB
tags = db["tag_collections"]
tags.create_index([("tag_name", "text")])