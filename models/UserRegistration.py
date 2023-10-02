from pydantic import BaseModel, EmailStr

class User(BaseModel):
    # Just for trial purpose
    first_name: str
    last_name: str
    user_email : EmailStr
    username: str
