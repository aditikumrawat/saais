from fastapi import APIRouter, HTTPException, UploadFile
from typing import List
from models.models import User, Product, Bundle, Tag
from config.database import users, products, fs, bundles, tags
from schema.schemas import list_User, list_Product, list_Bundle, list_Tag
from models.models import hash_password
from bson import ObjectId

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
            return {"message": "Username already exits."}

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
    all_users = list_User(users.find())
    return all_users


@router.get('/users/{user_id}')
def get_user_with_username(user_id: str):
    all_users = list_User(users.find())
    for user in all_users:
        if user["user_id"] == user_id:
            return {
                user["user_id"]: user
            }
    return {
        "error": "User does not exits!"
    }


@router.post('/product/upload_images/')
async def upload_product_image(image: List[UploadFile]):
    try:
        img_ids = []
        for img in image:
            image_data = await img.read()
            image_id = fs.put(image_data, filename=img.filename)
            img_ids.append(str(image_id))

        return {"image_id": img_ids}
    except Exception as e:
        return None


@router.post('/product/add_product')
def add_product(product: Product):
    try:

        product.product_title = product.product_title.capitalize()
        if_exist = products.find_one({'product_title': product.product_title})

        if if_exist:
            return {"message": "Title of product already exist."}

        product_info = {
            "product_title": product.product_title,
            "description": product.description,
            "price": product.price,
            "is_available": product.is_available,
            "tags_id": product.tags_id,
            "users_id": product.users_id,
            "images_id": product.images_id,
        }

        result = products.insert_one(product_info)
        id = str(result.inserted_id)

        return {"product_id": id, "message": "Product registered successfully"}
    except Exception as e:

        raise HTTPException(
            status_code=500, detail="Error registering product")


@router.post('/products')
def get_all_products():
    product_collections = list_Product(products.find())
    return product_collections


@router.post('/products/{product_id}')
def get_product_by_id(product_id: str):
    all_products = list_Product(products.find())
    for product in all_products:
        if product['product_id'] == product_id:
            return {
                "product_details": product
            }
    return {
        "error": "Invalid Product Id!"
    }


@router.put("/products/update_product/{product_id}")
def update_product(product_id: str, updated_product: Product):
    existing_product = products.find_one({"_id": ObjectId(product_id)})

    if existing_product:
        updated_product.product_title = updated_product.product_title.capitalize()
        if_exist = products.find_one(
            {'product_title': updated_product.product_title})

        if if_exist:
            return {"message": "Title of product already exist."}

        products.update_one({"_id": existing_product['_id']}, {
                            "$set": updated_product.dict()})

        return {"Updated_data_id": product_id, "message": f"Product updated successfully"}

    raise HTTPException(
        status_code=404, detail=f"Product {product_id} not found")


@router.delete("/products/delete_product/{product_id}")
def delete_product(product_id: str):

    existing_product = products.find_one({"_id": ObjectId(product_id)})

    if existing_product:
        products.delete_one({"_id": ObjectId(product_id)})
        return {"message": f"Product {product_id} deleted successfully"}

    raise HTTPException(
        status_code=404, detail=f"Product {product_id} not found")


@router.post('/bundle/add_bundle')
def add_bundle(bundle: Bundle):
    try:
        bundle.bundle_title = bundle.bundle_title.capitalize()
        existing_bundle = bundles.find_one(
            {"bundle_title": bundle.bundle_title})

        if existing_bundle:
            return {"message": f"Bundle title already exits."}

        bundle_details = {
            "bundle_title":  bundle.bundle_title,
            "description": bundle.description,
            "price": bundle.price,
            "tag_ids": bundle.tag_ids,
            "product_ids": bundle.product_ids,
        }

        result = bundles.insert_one(bundle_details)
        id = str(result.inserted_id)

        return {"bundle_id": id, "message": "Bundle registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering bundle")


@router.get("/bundles")
def get_all_bundles():
    all_bundles = list_Bundle(bundles.find())
    return all_bundles


@router.get("/bundles/{bundle_id}")
def get_bundles_by_id(bundle_id: str):
    all_bundles = list_Bundle(bundles.find())
    for bundle in all_bundles:
        if bundle['bundle_id'] == bundle_id:
            return {
                "bundle_details": bundle
            }
    return {
        "error": "Invalid Bundle Id!"
    }


@router.put("/bundles/update_bundle/{bundle_id}")
def update_bundle(bundle_id: str, updated_bundle: Bundle):
    existing_bundle = bundles.find_one({"_id": ObjectId(bundle_id)})

    if existing_bundle:
        updated_bundle.bundle_title = updated_bundle.bundle_title.capitalize()
        if_exits = bundles.find_one(
            {"bundle_title": updated_bundle.bundle_title})

        if if_exits:
            return {"message": "Bundle with similarly title already exists."}

        bundles.update_one({"_id": ObjectId(bundle_id)}, {
                           "$set": updated_bundle.dict()})
        return {"bundle_id": bundle_id, "message": f"Bundle updated successfully"}

    raise HTTPException(
        status_code=404, detail=f"Bundle {bundle_id} not found")


@router.delete("/bundles/delete_bundle/{bundle_id}")
def delete_bundle(bundle_id: str):

    existing_bundle = bundles.find_one({"_id": ObjectId(bundle_id)})

    if existing_bundle:
        bundles.delete_one({"_id": ObjectId(bundle_id)})
        return {"message": f"Bundle deleted successfully"}

    raise HTTPException(
        status_code=404, detail=f"Bundle {bundle_id} not found")


@router.post('/tag/add_tag')
def add_tag(tag: Tag):
    try:
        tag.tag_name = tag.tag_name.capitalize()
        if_exist = tags.find_one({"tag_name": tag.tag_name})
        if if_exist:
            return {"message": "Tag name already exist"}

        tag_info = {
            "tag_name": tag.tag_name
        }

        result = tags.insert_one(tag_info)
        id = str(result.inserted_id)

        return {"tag_id": id, "message": "Successfully added new tag."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering Tag")


@router.get('/tags')
def get_all_tags():
    all_tags = list_Tag(tags.find())
    return all_tags


@router.get('/tags/{tag_id}')
def get_tag_by_id(tag_id: str):
    all_tags = list_Tag(tags.find())

    for tag in all_tags:
        if tag["tag_id"] == tag_id:
            return {
                "tag_detail": tag
            }
    return {
        "message": "Details not found."
    }


@router.delete('/delete/{delete_id}')
def delete_tag(tag_id: str):

    if_exist = tags.find_one({"_id": ObjectId(tag_id)})
    if if_exist:
        tags.delete_one({"_id": ObjectId(tag_id)})
        return {"message": "Successfully deleted"}

    raise HTTPException(
        status_code=404, detail=f"Bundle {tag_id} not found")
