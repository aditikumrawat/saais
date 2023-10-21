
def UserSerializer(user) -> dict:
    return {
        "full_name" :user["full_name"],
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
        "product_title" : product["product_title"],
        "description": product["description"], 
        "price" : product["price"],
        "tag" : product["tag"], 
    }
    
def list_Product(products) -> list:
    registered_products = [ProductSerializer(product) for product in products]
    return registered_products


def BundleSerializer(bundle):
    return {
        "Bundle_id" : str(bundle["_id"]),
        "Bundle_title" : bundle["Bundle_title"],
        "description": bundle["description"], 
        "price" : bundle["price"],
        "tag" : bundle["tag"], 
        "products" : bundle["products"]
    }

def list_Bundle(bundles) -> list:
    registered_bundles = [BundleSerializer(bundle) for bundle in bundles]
    return registered_bundles