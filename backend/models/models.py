from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from fastapi import UploadFile
from passlib.context import CryptContext
from typing import Optional, List
from uuid import uuid4


class User(BaseModel):
    full_name: str = Field(default=None)
    email: EmailStr = Field(default=None)
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    username: str


class TokenData(BaseModel):
    username: str or None = None


class Tag(BaseModel):
    tag_name: str = Field(default=None)


class Product(BaseModel):
    product_title: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None, max_length=300)
    price: Optional[float] = Field(default=None)
    is_available: bool = Field(default=False)
    tags_id: List[str] = Field(default=None)
    user_id: Optional[str] = Field(default=None)
    images_id: List[str] = Field(default=None)

    created_at: datetime
    updated_at: datetime


class Bundle(BaseModel):
    bundle_title: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None, max_length=300)
    price: Optional[float] = Field(default=None)
    tag_ids: List[str] = Field(default=None)
    product_ids: List[str] = Field(default=None)
    user_id: Optional[str] = Field(default=None)

    created_at: datetime = None
    updated_at: datetime = None


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return password_context.hash(password)
