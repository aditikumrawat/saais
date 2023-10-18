from pydantic import BaseModel, EmailStr, Field
from fastapi import UploadFile, File
from passlib.context import CryptContext

class User(BaseModel):
    full_name: str = Field(default=None)
    email: EmailStr = Field(default=None)
    username: str
    password : str

class Token(BaseModel):
    access_token: str
    token_type: str
    username: str

class TokenData(BaseModel):
    username: str or None = None
    
    
class Product(BaseModel):
    product_title : str = Field(default=None)
    description : str = Field(
        default = None, max_length=300
    )
    price : float = Field(default=None)
    tag : str = Field(default=None)
    image : str | None
    
    
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return password_context.hash(password)

