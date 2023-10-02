from fastapi import APIRouter
from models.UserRegistration import User
from config.database import collection_name
from schema.schemas import list_User
from bson import ObjectId

router = APIRouter()

@router.get('/')
async def home():
    return {
        "success" : "Welcome to the home page!"
    }

# Get request method
@router.get('/users/')
async def get_users():
    users = list_User(collection_name.find())
    return users


@router.get('/users/{id}')
async def get_user_with_id(id: str):
    users = list_User(collection_name.find())
    for user in users:
        if user["user_id"] == id:
            return {
                    "user": user
                }
    return {
            "error": "User does not exits"
        }


@router.post('/users/add_user')
async def create_user(user: User):
    collection_name.insert_one(dict(user))


@router.put('/users/update_user/{id}')
async def update_user(id: str, user: User):
    collection_name.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(user)})

@router.delete('/delete/users')
async def delete_users():
      collection_name.delete_many


