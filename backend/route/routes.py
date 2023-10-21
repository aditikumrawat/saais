from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
from models.models import User, Product
from config.database import collection_name, products, fs
from schema.schemas import list_User, list_Product
from models.models import hash_password

router = APIRouter()
IMAGEDIR = 'images/'

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
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "password": hashed_password,
        }

        result = collection_name.insert_one(user_info)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering user")


@router.get('/users')
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

@router.post('/product/upload_images/')
async def upload_image(image: List[UploadFile]):
    try:
        img_ids = []
        for img in image:
            image_data = await img.read()
            image_id = fs.put(image_data, filename= img.filename)
            img_ids.append(str(image_id))

        return {"image_id": img_ids}
    except Exception as e :
        return None

@router.post('/product/add')
def add_product(product: Product):
    try:
        product_info = product.dict()
        
        result = products.insert_one(product_info)
        
        return {"message": "Product registered successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error registering product")


@router.post('/products')
def get_all_products():
    product_collections = list_Product(products.find())
    return product_collections


@router.put("/products/update/{product_title}")
def update_product(product_title: str, updated_product: Product):
    existing_product = products.find_one({"product_name": product_title})
    updated_product.product_title = updated_product.product_title.capitalize()
    if existing_product:
        products.update_one({"product_title": product_title}, {"$set": updated_product.model_dump()})
        return {"message": f"Product {product_title} updated successfully"}
    
    raise HTTPException(status_code=404, detail=f"Product {product_title} not found")

    
@router.delete("/products/delete/{product_title}")
def delete_product(product_title: str):
    product_title = product_title.capitalize()
    existing_product = products.find_one({"product_title": product_title})
    
    if existing_product:
        products.delete_one({"product_title": product_title})
        return {"message": f"Product {product_title} deleted successfully"}
    
    raise HTTPException(status_code=404, detail=f"Product {product_title} not found")
