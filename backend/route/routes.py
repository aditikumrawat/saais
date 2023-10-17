from fastapi import APIRouter, HTTPException
from models.models import User
from config.database import collection_name
from schema.schemas import list_User
from models.models import hash_password

router = APIRouter()

@router.get('/')
def home():
    return {
        "success": "Welcome to the home page!"
    }

@router.post("/register_user")
def register_user(user: User):
    try:
        hashed_password = hash_password(user.password)

        user_info = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "email": user.email,
            "password": hashed_password,
        }

        result = collection_name.insert_one(user_info)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering user")


@router.get('/users/')
def get_users():
    users = list_User(collection_name.find())
    return users


@router.get('/users/{username}')
def get_user_with_username(username: str):
    users = list_User(collection_name.find())
    for user in users:
        if user["username"] == username:
            return {
                user["username"] : user
            }
    return {
        "error": "User does not exits!"
    }
