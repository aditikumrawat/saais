from pydantic import BaseModel, EmailStr, Field
from fastapi import UploadFile
from passlib.context import CryptContext
from typing import Optional, List

class User(BaseModel):
    full_name: str = Field(default=None)
    email: EmailStr = Field(default=None)
    username : str
    password : str

class Token(BaseModel):
    access_token: str
    token_type: str
    username: str

class TokenData(BaseModel):
    username: str or None = None
    
    
class Product(BaseModel):
    product_title: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None, max_length=300)
    price: Optional[float] = Field(default=None)
    tag: Optional[str] = Field(default=None)
    image: List[str]  = []
    
class Bundle(BaseModel):
    Bundle_title: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None, max_length=300)
    price: Optional[float] = Field(default=None)
    tag: Optional[str] = Field(default=None)
    products: List[Product]  = []
    
class Tags(BaseModel):
    tag_name : str 
    
    
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return password_context.hash(password)