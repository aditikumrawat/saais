def UserSerializer(user) -> dict:
    return {
        "user_id": str(user['_id']),
        "full_name": user["full_name"],
        "email": user["email"],
        "username": user["username"],
        "password": user["password"]
    }


def list_User(users) -> list:
    registered_users = [UserSerializer(user) for user in users]
    return registered_users


def ProductSerializer(product):
    return {
        "product_id": str(product["_id"]),
        "product_title": product["product_title"],
        "description": product["description"],
        "price": product["price"],
        "is_available": product["is_available"],
        "tags_id": product["tags_id"],
        "users_id": product["users_id"],
        "images_id": product["images_id"]
    }


def list_Product(products) -> list:
    registered_products = [ProductSerializer(product) for product in products]
    return registered_products


def BundleSerializer(bundle):
    return {
        "bundle_id": str(bundle["_id"]),
        "Bundle_title": bundle["Bundle_title"],
        "description": bundle["description"],
        "price": bundle["price"],
        "tag_ids": bundle["tag_ids"],
        "product_ids": bundle["product_ids"]
    }


def list_Bundle(bundles) -> list:
    registered_bundles = [BundleSerializer(bundle) for bundle in bundles]
    return registered_bundles


def TagSerializer(tag):
    return {
        "tag_id": str(tag['_id']),
        "tag_name": tag['tag_name']
    }


def list_Tag(tags) -> list:
    list_tags = [TagSerializer(tag) for tag in tags]
    return list_tags
