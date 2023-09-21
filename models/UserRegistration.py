from pydantic import BaseModel


class User(BaseModel):
    # Just for trial purpose
    first_name: str
    last_name: str
    username: str
