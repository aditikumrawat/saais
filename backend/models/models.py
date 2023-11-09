from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from fastapi import UploadFile
from passlib.context import CryptContext
from typing import Optional, List


class User(BaseModel):
    full_name: str = Field(default=None)
    email: EmailStr = Field(default=None)
    username: str = Field(default=None)
    password: str = Field(default=None)

    is_active: bool = Field(default=False)


class Token(BaseModel):
    access_token: str
    token_type: str
    fullname: str


class TokenData(BaseModel):
    username: str or None = None


class Tag(BaseModel):
    tag_name: str = Field(default=None)


class Login(BaseModel):
    username: str
    password: str


class GoogleSignUp(BaseModel):
    full_name: str = Field(default=None)
    email: EmailStr = Field(default=None)
    username : str = Field(default=None)
    
    is_active: bool = Field(default=False)
    id_token: str 

class ForgotPassword(BaseModel):
    email : str = Field(default=None)
    password : str = Field(default=None)
    
class ChangePassword(BaseModel):
    token : str = Field(default=None)
    password : str = Field(default=None)

# class Bundle(BaseModel):
#     bundle_title: Optional[str] = Field(default=None)
#     description: Optional[str] = Field(default=None, max_length=300)
#     price: Optional[float] = Field(default=None)
#     tag_ids: List[str] = Field(default=None)
#     product_ids: List[str] = Field(default=None)
#     user_id: Optional[str] = Field(default=None)

#     created_at: datetime
#     updated_at: datetime


# class Review(BaseModel):
#     text : str = Field(default=None)
#     product_id : str = Field(default=None)
#     reviewer_id : str = Field(default=None)

# class Rating(BaseModel):
#     rating : int = Field(default=None)
#     product_id : str = Field(default=None)
#     reviewer_id : str = Field(default=None)

# class WatchList(BaseModel):
#     product_id : str = Field(default=None)
#     is_bundle : bool = Field(default=False)
#     notification_id : str = Field(default=None)


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return password_context.hash(password)
