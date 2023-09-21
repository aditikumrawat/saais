from pymongo import MongoClient

client = MongoClient("mongodb+srv://saais_admin:ZA81qfDASREEZ5qD@saaisdb.dyhcbgz.mongodb.net/?retryWrites=true&w=majority")

db = client.user_db
collection_name = db["user_collections"]