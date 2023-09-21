from fastapi import APIRouter
from models.UserRegistration import User
from config.database import collection_name
from schema.schemas import list_User
from bson import ObjectId

router = APIRouter()


# Get request method
@router.get('/')
async def get_user():
    users = list_User(collection_name.find())
    return users