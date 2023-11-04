from fastapi import APIRouter, HTTPException, Request
from models.models import User, Tag
from config.database import users, bundles, tags, reviews, ratings
from schema.schemas import list_User, list_Bundle, list_Tag, list_Rating, list_Review
from models.models import hash_password
from bson import ObjectId
from datetime import datetime
from itertools import permutations
import random
from schema.schemas import send_email

router = APIRouter()


@router.get('/')
def home():
    return {
        "success": "Welcome to the home page!"
    }


@router.post("/register_user")
def register_user(user: User):
    try:
        existing_user_email = users.find_one({"email": user.email})
        existing_username = users.find_one({"username": user.username})

        if existing_user_email or existing_username:
            return {"message": "Email already exits."}

        hashed_password = hash_password(user.password)

        user_info = {
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "password": hashed_password,
            "is_active" : False
        }

        result = users.insert_one(user_info)
        id = str(result.inserted_id)
        
        send_email(user.email)

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
def get_user_with_userid(user_id: str):
    all_users = list_User(users.find())
    for user in all_users:
        if user["user_id"] == user_id:
            return {
                user
            }
    return {
        "error": "User does not exits!"
    }


@router.get('/users/{username}')
def get_user_with_username(username: str):
    all_users = list_User(users.find())
    for user in all_users:
        if user["username"] == username:
            return {"message" : True}
    return {"message" :  False}

@router.delete('/users/delete_user/{user_id}')
def delete_user(user_id: str):
    user_exists = users.find_one({'_id': ObjectId(user_id)})

    if user_exists:
        users.delete_one({'_id': ObjectId(user_id)})
        return {"message": "User successfully deleted."}

    raise HTTPException(
        status_code=404, detail="User not found.")
    
@router.get('/generate_username/{full_name}')
def generate_username(full_name: str):
    arr = full_name.split()
    first_name = arr[0]    
    first_name = first_name.strip()
   
    counter = 100
    while counter > 0:
        random_number = random.randrange(1, 99)
        ls = [first_name,'_',str(random_number)]
        
        all_permutations = list(permutations(ls))
        for permu in all_permutations:
            s = "".join(permu)
            exists = users.find_one({"username" : s})
            if not exists:
                    return s
        counter-=1   
    
    if len(arr) > 1:
        last_name = arr[1]
        last_name = last_name.strip()
    while True:
        random_number = random.randrange(1, 99)
        ls = [first_name, last_name, '_', random_number]
        
        all_permutations = list(permutations(ls))
        
        for permu in all_permutations:
            s = "".join(permu)
            exists = users.find_one({"username" : s})
            if not exists:
                    return s


# @router.post('/bundle/add_bundle')
# def add_bundle(bundle: Bundle):
#     try:

#         bundle.bundle_title = bundle.bundle_title.capitalize()

#         tag_id = bundle.tag_ids
#         product_ids = bundle.product_ids
#         if len(tag_id) > 5 or len(product_ids) > 5:
#             return {"message": "Tag ids and Product ids can not be more than 5."}

#         if bundle.price < 0:
#             return {"message": "Price can not be less negative."}

#         bundle_details = {
#             "bundle_title":  bundle.bundle_title,
#             "description": bundle.description,
#             "price": bundle.price,
#             "tag_ids": bundle.tag_ids,
#             "product_ids": bundle.product_ids,
#             "user_id": bundle.user_id,
#             "created_at": datetime.utcnow(),
#             "updated_at": datetime.utcnow()
#         }

#         result = bundles.insert_one(bundle_details)
#         bundle_id = str(result.inserted_id)

#         return {"message": "Bundle registered successfully",
#                 "bundle_id": bundle_id,
#                 "bundle_details": bundle
#                 }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Error registering bundle")


# @router.get("/bundles")
# def get_all_bundles():
#     all_bundles = list_Bundle(bundles.find())
#     return all_bundles


# @router.get('/bundles/users/{user_id}')
# def get_bundles_by_user(user_id: str):
#     all_bundles = list_Bundle(bundles.find())
#     user_bundles = []

#     for bundle in all_bundles:
#         if bundle['user_id'] == user_id:
#             user_bundles.append(bundle)

#     return user_bundles


# @router.get("/bundles/{bundle_id}")
# def get_bundles_by_id(bundle_id: str):
#     all_bundles = list_Bundle(bundles.find())
#     for bundle in all_bundles:
#         if bundle['bundle_id'] == bundle_id:
#             return bundle
#     return {
#         "error": "Invalid Bundle Id!"
#     }


# @router.put("/bundles/update_bundle/{bundle_id}")
# def update_bundle(bundle_id: str, updated_bundle: Bundle):
#     existing_bundle = bundles.find_one({"_id": ObjectId(bundle_id)})

#     if existing_bundle:
#         updated_bundle.updated_at = datetime.utcnow()
#         bundles.update_one({"_id": ObjectId(bundle_id)}, {
#                            "$set": updated_bundle.dict()})
#         return {"message": f"Bundle updated successfully",
#                 "bundle_id": bundle_id,
#                 "bundle_details": updated_bundle
#                 }

#     raise HTTPException(
#         status_code=404, detail=f"Bundle {bundle_id} not found")


# @router.delete("/bundles/delete_bundle/{bundle_id}")
# def delete_bundle(bundle_id: str):

#     existing_bundle = bundles.find_one({"_id": ObjectId(bundle_id)})

#     if existing_bundle:
#         bundles.delete_one({"_id": ObjectId(bundle_id)})
#         return {"message": f"Bundle deleted successfully"}

#     raise HTTPException(
#         status_code=404, detail=f"Bundle {bundle_id} not found")


# @router.get('/reviews/')
# def get_all_reviews():
#     all_reviews = list_Review(reviews.find())
#     return all_reviews


# @router.get('/reviews/{review_id}')
# def get_review_by_id(review_id: str):
#     all_reviews = list_Review(reviews.find())

#     for review in all_reviews:
#         if review["review_id"] == review_id:
#             return review

#     raise HTTPException(
#         status_code=404, detail="Review not found."
#     )


# @router.post('/reviews/add_review')
# def add_review(review: Review):
#     try:
#         review_info = {
#             "text": review.text,
#             "product_id": review.product_id,
#             "reviewer_id": review.reviewer_id
#         }
#         result = reviews.insert_one(review_info)
#         id = str(result.inserted_id)

#         return {"message": "Your review successfully added.",
#                 "review_id": id,
#                 "review_details": review
#                 }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Error adding review")


# @router.put('/reviews/update_review/{review_id}')
# def update_review(review_id: str, updated_review: Review):
#     try:
#         if_exists = reviews.find_one({'_id': ObjectId(review_id)})

#         if if_exists:
#             reviews.update_one({'_id': ObjectId(review_id)},
#                                {'$set': updated_review.dict()})
#             return {"message": "Review successfully updated",
#                     "review_id": review_id,
#                     "review_details": updated_review
#                     }
#     except Exception as e:
#         raise HTTPException(status_code=404, detail="Review not found")


# @router.delete('/reviews/delete_review/{review_id}')
# def delete_review(review_id: str):
#     try:
#         if_exists = reviews.find_one({'_id': ObjectId(review_id)})

#         if if_exists:
#             reviews.delete_one({'_id': ObjectId(review_id)})
#             return {"message": "Review successfully deleted"}

#     except Exception as e:
#         raise HTTPException(status_code=404, detail="Review not found")


# @router.post('/tags/add_tag')
# def add_tag(tag: Tag):
#     try:
#         tag.tag_name = tag.tag_name.capitalize()
#         if_exist = tags.find_one({"tag_name": tag.tag_name})
#         if if_exist:
#             return {"message": "Tag name already exist"}

#         tag_info = {
#             "tag_name": tag.tag_name
#         }

#         result = tags.insert_one(tag_info)
#         id = str(result.inserted_id)

#         return {"message": "Successfully added new tag.",
#                 "tag_id": id,
#                 "tag_details": tag
#                 }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Error registering Tag")


# @router.get('/tags')
# def get_all_tags():
#     all_tags = list_Tag(tags.find())
#     return all_tags


# @router.get('/tags/{tag_id}')
# def get_tag_by_id(tag_id: str):
#     all_tags = list_Tag(tags.find())

#     for tag in all_tags:
#         if tag["tag_id"] == tag_id:
#             return {
#                 "tag_detail": tag
#             }
#     return {
#         "message": "Details not found."
#     }


# @router.delete('/tags/delete/{delete_id}')
# def delete_tag(tag_id: str):

#     if_exist = tags.find_one({"_id": ObjectId(tag_id)})
#     if if_exist:
#         tags.delete_one({"_id": ObjectId(tag_id)})
#         return {"message": "Successfully deleted"}

#     raise HTTPException(
#         status_code=404, detail=f"Bundle {tag_id} not found")


# @router.get("/tags/search_tag/{tag_name}")
# def search_tag(tag_name: str):

#     regex_pattern = f"^{tag_name}.+"
#     query = {"tag_name": {"$regex": regex_pattern, "$options": "i"}}

#     all_tags = tags.find(query)

#     search_results = [tag for tag in all_tags]

#     cnt = 0
#     final_searched_list = []

#     for tag in search_results:
#         tag['_id'] = str(tag['_id'])
#         final_searched_list.append(tag)
#         cnt += 1
#         if cnt >= 10:
#             break

#     return final_searched_list


# @router.post('/ratings/add_rating')
# def add_rating(rating: Rating):
#     try:

#         if rating.rating > 5 or rating.rating < 0:
#             return {"message": "Invalid rating!"}

#         rating_info = {
#             "rating": rating.rating,
#             "product_id": rating.product_id,
#             "reviewer_id": rating.reviewer_id
#         }

#         result = ratings.insert_one(rating_info)
#         rating_id = str(result.inserted_id)

#         return {"message": "Successfully rating added.",
#                 "rating_id": rating_id,
#                 "rating_details":  rating
#                 }
#     except Exception as e:
#         raise Exception(status_code=500, detail="Error while adding rating")


# @router.get('/ratings/')
# def get_all_ratings():
#     all_ratings = list_Rating(ratings.find())
#     return all_ratings


# @router.get('/ratings/{rating_id}')
# def get_rating_by_id(rating_id: str):
#     all_ratings = list_Rating(ratings.find())

#     for rating in all_ratings:
#         if rating['rating_id'] == rating_id:
#             return rating

#     raise HTTPException(status_code=404, detail="Rating detail not found.")


# @router.put('/rating/update_rating/{rating_id}')
# def update_rating(rating_id: str, updated_rating: Rating):
#     if_exist = ratings.find_one({"_id": ObjectId(rating_id)})

#     if if_exist:

#         if updated_rating.rating > 5 or updated_rating.rating < 0:
#             return {"message": "Invalid rating!"}

#         ratings.update_one({"_id": ObjectId(rating_id)},
#                            {'$set': updated_rating.dict()})

#         return {"message": "Successfully updated rating.",
#                 "rating_id": rating_id,
#                 "rating_details": updated_rating
#                 }

#     raise Exception(status_code=404, detail="Rating details not found.")


# @router.delete('/ratings/delete_rating/{rating_id}')
# def delete_rating_by_rating_id(rating_id: str):

#     exists = ratings.find_one({'_id': ObjectId(rating_id)})

#     if exists:
#         ratings.delete_one({'_id': ObjectId(rating_id)})
#         return {"message": "Rating successfully deleted"}

#     raise HTTPException(
#         status_code=404, detail="Rating details not found"
#     )



