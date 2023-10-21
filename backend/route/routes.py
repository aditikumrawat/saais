from fastapi import APIRouter, HTTPException, UploadFile
from typing import List
from models.models import User, Product, Bundle
from config.database import users, products, fs, bundles
from schema.schemas import list_User, list_Product, list_Bundle
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
        existing_user = users.find_one({"username": user.username})
        
        if existing_user:
            return {"message" : "Username already exits."}
        
        hashed_password = hash_password(user.password)

        user_info = {
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "password": hashed_password,
        }

        result = users.insert_one(user_info)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering user")


@router.get('/users')
def get_users():
    all_users= list_User(users.find())
    return all_users


@router.get('/users/{username}')
def get_user_with_username(username: str):
    users = list_User(users.find())
    for user in users:
        if user["username"] == username:
            return {
                user["username"]: user
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

@router.post('/product/add_product')
def add_product(product: Product):
    try:
        existing_product = products.find_one(
            {"product_title": product["product_title"].capitalize()})

        if existing_product:
            return {"message": "Product Already exist."}

        product_info = product.model_dump()

        result = products.insert_one(product_info)
        result["product_title"] = result["product_title"].capitalize()

        return {"message": "Product registered successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail="Error registering product")


@router.post('/products')
def get_all_products():
    product_collections = list_Product(products.find())
    return product_collections


@router.put("/products/update_product/{product_title}")
def update_product(product_title: str, updated_product: Product):
    product_title = product_title.capitalize()
    existing_product = products.find_one({"product_title": product_title})

    if existing_product:
        updated_product.product_title = product_title
        products.update_one({"product_title": product_title}, {
                            "$set": updated_product.model_dump()})
        return {"message": f"Product {product_title} updated successfully"}

    raise HTTPException(
        status_code=404, detail=f"Product {product_title} not found")


@router.delete("/products/delete_product/{product_title}")
def delete_product(product_title: str):
    product_title = product_title.capitalize()
    existing_product = products.find_one({"product_title": product_title})

    if existing_product:
        products.delete_one({"product_title": product_title})
        return {"message": f"Product {product_title} deleted successfully"}

    raise HTTPException(
        status_code=404, detail=f"Product {product_title} not found")


@router.post('/Bundle/add_bundle')
def add_bundle(bundle: Bundle):
    try:
        existing_bundle = bundles.find_one(
            {"bundle_title": bundle["bundle_title"]})

        if existing_bundle:
            return {"message": f"Bundle {bundle['bundle_title']} already exits."}

        bundle_details = bundle.model_dump()

        result = bundles.insert_one(bundle_details)
        result['bundle_title'] = result['bundle_title'].capitalize()

        return {"message": "Bundle registered successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error registering bundle")


@router.get("/Bundles/{bundle_title}")
def get_bundles(Bundle_title: str):
    Bundles = list_Bundle(bundles.find())
    for bundle in Bundles:
        if bundle["Bundle_title"] == Bundle_title:
            return {
                bundle["Bundle_title"]: bundle
            }
    return {
        "error": "Invalid Bundle title !"
    }


@router.put("/bundles/update_bundle/{bundle_title}")
def update_bundle(bundle_title: str, updated_bundle: Bundle):
    bundle_title = bundle_title.capitalize()
    existing_bundle = bundles.find_one({"bundle_title": bundle_title})

    if existing_bundle:
        updated_bundle.bundle_title = bundle_title
        bundles.update_one({"bundle_title": bundle_title}, {
                           "$set": updated_bundle.model_dump()})
        return {"message": f"Bundle {bundle_title} updated successfully"}

    raise HTTPException(
        status_code=404, detail=f"Bundle {bundle_title} not found")


@router.delete("/bundles/delete_bundle/{bundle_title}")
def delete_bundle(bundle_title: str):
    bundle_title = bundle_title.capitalize()
    existing_bundle = bundles.find_one({"bundle_title": bundle_title})

    if existing_bundle:
        bundles.delete_one({"bundle_title": bundle_title})
        return {"message": f"Bundle {bundle_title} deleted successfully"}

    raise HTTPException(
        status_code=404, detail=f"Bundle {bundle_title} not found")