from fastapi import APIRouter, HTTPException, UploadFile, Response, Query
from typing import List
from models.models import User, Product, Bundle, Tag, Review, Rating
from config.database import users, products, fs, bundles, tags, reviews, ratings
from schema.schemas import list_User, list_Product, list_Bundle, list_Tag, list_Rating, list_Review
from models.models import hash_password
from bson import ObjectId
from datetime import datetime

router = APIRouter()


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
        id = str(result.inserted_id)

        return {"message": "User registered successfully",
                "user_id": id,
                "user_detail": user
                }
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


@router.delete('/users/delete_user/{user_id}')
def delete_user(user_id: str):
    user_exists = users.find_one({'_id': ObjectId(user_id)})

    if user_exists:
        users.delete_one({'_id': ObjectId(user_id)})
        return {"message": "User successfully deleted."}

    raise HTTPException(
        status_code=404, detail="User not found.")


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


@router.get("/get-multiple-images/")
async def get_multiple_images(gridfs_ids: List[str] = Query([])):
    try:
        image_responses = []

        for gridfs_id in gridfs_ids:
            file_info = fs.get(gridfs_id)
            image_data = file_info.read()
            content_type = "image/jpeg"

            image_responses.append(
                {"content": image_data, "media_type": content_type})

        return image_responses
    except Exception as e:
        return {"error": "Failed to retrieve images"}


@router.post('/product/add_product')
def add_product(product: Product):
    try:
        product.product_title = product.product_title.capitalize()

        image_id = product.images_id
        tag_id = product.tags_id

        if len(image_id) > 5 or len(tag_id) > 5:
            return {"message": "Image id or tag id can not be more than 5."}

        product_info = {
            "product_title": product.product_title,
            "description": product.description,
            "price": product.price,
            "is_available": product.is_available,
            "tags_id": product.tags_id,
            "user_id": product.user_id,
            "images_id": product.images_id,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        result = products.insert_one(product_info)
        product_id = str(result.inserted_id)

        return {
            "message": "Product registered successfully",
            "product_id": product_id,
            "product_details": product
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="Error registering product")


@router.get('/products')
def get_all_products():
    product_collections = list_Product(products.find())
    return product_collections


@router.get('/products/{product_id}')
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


@router.get('/products/users/{user_id}')
def get_products_by_user(user_id: str):
    all_products = list_Product(products.find())
    user_product = []

    for product in all_products:
        if product['user_id'] == user_id:
            user_product.append(product)
    return user_product


@router.put("/products/update_product/{product_id}")
def update_product(product_id: str, updated_product: Product):
    existing_product = products.find_one({"_id": ObjectId(product_id)})

    if existing_product:
        updated_product.product_title = updated_product.product_title.capitalize()
        if_user_exist = products.find_one({'user_id': updated_product.user_id})
        if_title_exist = products.find_one(
            {'product_title': updated_product.product_title})

        if if_title_exist and if_user_exist and str(if_title_exist["_id"]) != product_id:
            return {"message": "Title of product already exist."}

        updated_product.updated_at = datetime.utcnow()
        products.update_one({"_id": existing_product['_id']}, {
                            "$set": updated_product.dict()})

        return {"message": f"Product updated successfully",
                "Updated_data_id": product_id,
                "product_details": updated_product
                }

    raise HTTPException(
        status_code=404, detail=f"Product {product_id} not found")


@router.get("/search/{title}")
def search_product(title: str):

    regex_pattern = f"^{title}.+"
    query_products = {"product_title": {"$regex": regex_pattern, "$options": "i"}}

    all_products = products.find(query_products)
    
    query_bundles = {"bundle_title": {"$regex": regex_pattern, "$options": "i"}}

    all_bundles = bundles.find(query_bundles)

    search_results_products = [product for product in all_products]
    
    search_results_bundles = [bundle for bundle in all_bundles]

    resulted_products = []
    cnt = 0
    for product in search_results_products:
        product['_id'] = str(product['_id'])
        resulted_products.append(product)
        cnt += 1
        if cnt >= 3 :
            break
    
    resulted_bundles = []
    for bundle in search_results_bundles:
        bundle['_id'] = str(bundle['_id'])
        resulted_bundles.append(bundle)
        cnt += 1
        if cnt >= 5 :
            break
        
    result = {
        "products" : resulted_products,
        "bundles" : resulted_bundles
    }
        
    return result


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

        tag_id = bundle.tag_ids
        product_ids = bundle.product_ids
        if len(tag_id) > 5 or len(product_ids) > 5:
            return {"message": "Tag ids and Product ids can not be more than 5."}

        if bundle.price < 0:
            return {"message": "Price can not be less negative."}

        bundle_details = {
            "bundle_title":  bundle.bundle_title,
            "description": bundle.description,
            "price": bundle.price,
            "tag_ids": bundle.tag_ids,
            "product_ids": bundle.product_ids,
            "user_id": bundle.user_id,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        result = bundles.insert_one(bundle_details)
        bundle_id = str(result.inserted_id)

        return { "message": "Bundle registered successfully",
                "bundle_id": bundle_id,
                "bundle_details" : bundle 
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering bundle")


@router.get("/bundles")
def get_all_bundles():
    all_bundles = list_Bundle(bundles.find())
    return all_bundles


@router.get('/bundles/users/{user_id}')
def get_bundles_by_user(user_id: str):
    all_bundles = list_Bundle(bundles.find())
    user_bundles = []

    for bundle in all_bundles:
        if bundle['user_id'] == user_id:
            user_bundles.append(bundle)

    return user_bundles


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
        updated_bundle.updated_at = datetime.utcnow()
        bundles.update_one({"_id": ObjectId(bundle_id)}, {
                           "$set": updated_bundle.dict()})
        return {"message": f"Bundle updated successfully",
                "bundle_id": bundle_id,
                "bundle_details" : updated_bundle
        }

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


@router.get('/reviews/')
def get_all_reviews():
    all_reviews = list_Review(reviews.find())
    return all_reviews


@router.get('/reviews/{review_id}')
def get_review_by_id(review_id: str):
    all_reviews = list_Review(reviews.find())

    for review in all_reviews:
        if review["review_id"] == review_id:
            return {"review_details": review}

    raise HTTPException(
        status_code=404, detail="Review not found."
    )


@router.post('/reviews/add_review')
def add_review(review: Review):
    try:
        review_info = {
            "text": review.text,
            "product_id": review.product_id,
            "reviewer_id": review.reviewer_id
        }
        result = reviews.insert_one(review_info)
        id = str(result.inserted_id)

        return {"message": "Your review successfully added.",
                "review_id": id,
                "review_details" : review
                }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Error adding review")


@router.put('/reviews/update_review/{review_id}')
def update_review(review_id: str, updated_review: Review):
    try:
        if_exists = reviews.find_one({'_id': ObjectId(review_id)})

        if if_exists:
            reviews.update_one({'_id': ObjectId(review_id)},
                               {'$set': updated_review.dict()})
            return {"message": "Review successfully updated",
                    "review_id": review_id,
                    "review_details" : updated_review
                    }
    except Exception as e:
        raise HTTPException(status_code=404, detail="Review not found")


@router.delete('/reviews/delete_review/{review_id}')
def delete_review(review_id: str):
    try:
        if_exists = reviews.find_one({'_id': ObjectId(review_id)})

        if if_exists:
            reviews.delete_one({'_id': ObjectId(review_id)})
            return {"message": "Review successfully deleted"}

    except Exception as e:
        raise HTTPException(status_code=404, detail="Review not found")


@router.post('/tags/add_tag')
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

        return {"message": "Successfully added new tag.",
                "tag_id": id,
                "tag_details" : tag
                }
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


@router.delete('/tags/delete/{delete_id}')
def delete_tag(tag_id: str):

    if_exist = tags.find_one({"_id": ObjectId(tag_id)})
    if if_exist:
        tags.delete_one({"_id": ObjectId(tag_id)})
        return {"message": "Successfully deleted"}

    raise HTTPException(
        status_code=404, detail=f"Bundle {tag_id} not found")


@router.get("/tags/search_tag/{tag_name}")
def search_tag(tag_name: str):

    regex_pattern = f"^{tag_name}.+"
    query = {"tag_name": {"$regex": regex_pattern, "$options": "i"}}

    all_tags = tags.find(query)

    search_results = [tag for tag in all_tags]
    
    cnt = 0
    final_searched_list = []
    
    for tag in search_results:
        tag['_id'] = str(tag['_id'])
        final_searched_list.append(tag)
        cnt += 1
        if cnt >= 5 :
            break
    
    return final_searched_list
