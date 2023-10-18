from fastapi import APIRouter, HTTPException
from models.models import User, Product
from config.database import collection_name, products
from schema.schemas import list_User, list_Product
from models.models import hash_password

router = APIRouter()

@router.get('/')
def home():
    return {
        "success": "Welcome to the home page!"
    }

@router.post("/register_user")
def register_user(user: User):
    try:
        hashed_password = hash_password(user.password)

        user_info = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "email": user.email,
            "password": hashed_password,
        }

        result = collection_name.insert_one(user_info)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering user")


@router.get('/users/')
def get_users():
    users = list_User(collection_name.find())
    return users


@router.get('/users/{username}')
def get_user_with_username(username: str):
    users = list_User(collection_name.find())
    for user in users:
        if user["username"] == username:
            return {
                user["username"] : user
            }
    return {
        "error": "User does not exits!"
    }


@router.post('/product/add')
def add_product(product: Product):
    try:
        product_info = {
            "product_name": product.product_name,
            "description": product.description,
            "price": product.price,
            "tag": product.tag,
        }

        result = products.insert_one(product_info)
        return {"message": "Product registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering product")

@router.post('/products')
def get_all_products():
    product_collection = list_Product(products.find())
    return product_collection


@router.put("/products/{product_name}")
def update_product(product_name: str, updated_product: Product):
    existing_product = products.find_one({"product_name": product_name})
    updated_product.product_name = updated_product.product_name.capitalize()
    if existing_product:
        products.update_one({"product_name": product_name}, {"$set": updated_product.model_dump()})
        return {"message": f"Product {product_name} updated successfully"}
    
    raise HTTPException(status_code=404, detail=f"Product {product_name} not found")

    
@router.delete("/products/{product_name}")
def delete_product(product_name: str):
    product_name = product_name.capitalize()
    existing_product = products.find_one({"product_name": product_name})
    
    if existing_product:
        products.delete_one({"product_name": product_name})
        return {"message": f"Product {product_name} deleted successfully"}
    
    raise HTTPException(status_code=404, detail=f"Product {product_name} not found")