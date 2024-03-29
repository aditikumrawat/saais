
def UserSerializer(user) -> dict:
    return {
        "user_id": str(user['_id']),
        "full_name": user["full_name"],
        "username": user["username"],
        "email": user["email"],
        "password": user["password"],
        "phone_no": str(user["phone_no"]),
        "is_active" : user['is_active']
    }


def list_User(users) -> list:
    registered_users = [UserSerializer(user) for user in users]
    return registered_users



# def BundleSerializer(bundle):
#     return {
#         "bundle_id": str(bundle["_id"]),
#         "bundle_title": bundle["bundle_title"],
#         "description": bundle["description"],
#         "price": bundle["price"],
#         "tag_ids": bundle["tag_ids"],
#         "product_ids": bundle["product_ids"],
#         "user_id" : bundle["user_id"],
#         "created_at" : bundle["created_at"],
#         "updated_at" : bundle["updated_at"]
#     }


# def list_Bundle(bundles) -> list:
#     registered_bundles = [BundleSerializer(bundle) for bundle in bundles]
#     return registered_bundles


# def ReviewSerializer(review):
#     return {
#         "review_id": str(review['_id']),
#         "text": review["text"],
#         "reviewer_id": review['reviewer_id'],
#         "product_id": review['product_id']
#     }


# def list_Review(reviews):
#     all_review = [ReviewSerializer(review) for review in reviews]
#     return all_review


# def RatingSerializer(rating):
#     return {
#         "rating_id": str(rating['_id']),
#         "rating": rating['rating'],
#         "reviewer_id": rating['reviewer_id'],
#         "product_id": rating['product_id']
#     }


# def list_Rating(all_ratings):
#     ratings = [RatingSerializer(rating) for rating in all_ratings]
#     return ratings


# def TagSerializer(tag):
#     return {
#         "tag_id": str(tag['_id']),
#         "tag_name": tag['tag_name']
#     }


# def list_Tag(tags) -> list:
#     list_tags = [TagSerializer(tag) for tag in tags]
#     return list_tags




