
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


def ProductSerializer(product):
    return {
        "product_id" : str(product["_id"]),
        "product_name" : product["product_name"],
        "description": product["product_name"], 
        "price" : product["product_name"],
        "tags" : product["product_name"], 
    }
    
def list_Product(products) -> list:
    registered_products = [ProductSerializer(product) for product in products]
    return registered_products