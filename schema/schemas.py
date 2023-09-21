
# here unique user data get printed
def UserSerializer(user) -> dict:
    return {
        "user_id": str(user["_id"]),
        "username": user["username"],
    }


# Listing all the users with the id and username
def list_User(users) -> list:
    registered_users = [UserSerializer(user) for user in users]
    return registered_users
