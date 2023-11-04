import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets

def UserSerializer(user) -> dict:
    return {
        "user_id": str(user['_id']),
        "full_name": user["full_name"],
        "email": user["email"],
        "username": user["username"],
        "password": user["password"],
        "is_active" : user['is_active']
    }


def list_User(users) -> list:
    registered_users = [UserSerializer(user) for user in users]
    return registered_users

def BundleSerializer(bundle):
    return {
        "bundle_id": str(bundle["_id"]),
        "bundle_title": bundle["bundle_title"],
        "description": bundle["description"],
        "price": bundle["price"],
        "tag_ids": bundle["tag_ids"],
        "product_ids": bundle["product_ids"],
        "user_id" : bundle["user_id"],
        "created_at" : bundle["created_at"],
        "updated_at" : bundle["updated_at"]
    }


def list_Bundle(bundles) -> list:
    registered_bundles = [BundleSerializer(bundle) for bundle in bundles]
    return registered_bundles


def ReviewSerializer(review):
    return {
        "review_id": str(review['_id']),
        "text": review["text"],
        "reviewer_id": review['reviewer_id'],
        "product_id": review['product_id']
    }


def list_Review(reviews):
    all_review = [ReviewSerializer(review) for review in reviews]
    return all_review


def RatingSerializer(rating):
    return {
        "rating_id": str(rating['_id']),
        "rating": rating['rating'],
        "reviewer_id": rating['reviewer_id'],
        "product_id": rating['product_id']
    }


def list_Rating(all_ratings):
    ratings = [RatingSerializer(rating) for rating in all_ratings]
    return ratings


def TagSerializer(tag):
    return {
        "tag_id": str(tag['_id']),
        "tag_name": tag['tag_name']
    }


def list_Tag(tags) -> list:
    list_tags = [TagSerializer(tag) for tag in tags]
    return list_tags


smtp_server = "smtp.gmail.com" 
smtp_port = 587  
sender_email = "aditikumrawat24@gmail.com"
sender_password = "igdh sgpp gzwl hqiz"

def send_email(recipient_email):
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls() 
        server.login(sender_email, sender_password)
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = "Activate your account"
        
        
        activation_token = secrets.token_urlsafe(32)
        activation_link = f"http://localhost:3000/activate?token={activation_token}"
        body = f"Click the following link to activate your account: {activation_link}"
        # body = "Hello"
        message.attach(MIMEText(body, "plain"))

        server.sendmail(sender_email, recipient_email, message.as_string())
        server.quit()

        print("Email sent successfully.")
    except Exception as e:
        print(f"Error: {str(e)}")

