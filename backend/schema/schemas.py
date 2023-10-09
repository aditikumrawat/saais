
def UserSerializer(user) -> dict:
    return {
        "first_name" :user["first_name"],
        "last_name" :user["last_name"],
        "email" : user["email"],
        "username": user["username"],
        "password" : user["password"]
    }

def list_User(users) -> list:
    registered_users = [UserSerializer(user) for user in users]
    return registered_users