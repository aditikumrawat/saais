from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from models.models import User, GoogleSignUp, ForgotPassword, ChangePassword
from decouple import config
from schema.schemas import list_User
from config.database import users
from bson import ObjectId
from models.models import hash_password
from bson import ObjectId
from itertools import permutations
from google.auth.transport import requests as gr
from google.oauth2 import id_token
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from passlib.context import CryptContext
import requests
import random
import smtplib
from decouple import config


SECRET_KEY = config("secret")
ALGORITHM = config("algorithm")
GOOGLE_CLIENT_ID = config("google_client_id")
ACCESS_TOKEN_EXPIRE_MINUTES = 50

smtp_port = 587
smtp_server = config("smtp_server")
sender_email = config("sender_email")
sender_password = config("sender_password")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/google/")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


origins = ["https://localhost:3000", "*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/')
def home():
    return {
        "success": "Welcome to the home page!"
    }


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    db = list_User(users.find())
    for user in db:
        if user["username"] == username:
            user_data = user
            return User(**user_data)
    return None


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False

    return user


def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def send_email(recipient_email, user_id):
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = "Activate your account"
        
        data = {'user_id': user_id}
        expiry_time = timedelta(minutes=20)
        activation_token = create_access_token(data, expires_delta=expiry_time)
        activation_link = f"http://localhost:3000/activate?token={activation_token}"
        body = f"Click the following link to activate your account: {activation_link}"
        message.attach(MIMEText(body, "plain"))

        server.sendmail(sender_email, recipient_email, message.as_string())
        server.quit()
        print("Email sent successfully.")
    except Exception as e:
        print(f"Error: {str(e)}")


@app.post("/register_user")
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
            "is_active": False
        }

        result = users.insert_one(user_info)
        id = str(result.inserted_id)

        send_email(user.email, id)

        return {"message": "User registered successfully",
                "user_id": id,
                "user_detail": user
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error registering user")


@app.get('/users')
def get_users():
    all_users = list_User(users.find())
    return all_users


@app.get('/users/ids/{user_id}')
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


@app.get('/users/{username}')
def get_user_with_username(username: str):
    all_users = list_User(users.find())
    for user in all_users:
        if user["username"] == username:
            return True
    return False


@app.delete('/users/delete_user/{user_id}')
def delete_user(user_id: str):
    user_exists = users.find_one({'_id': ObjectId(user_id)})

    if user_exists:
        users.delete_one({'_id': ObjectId(user_id)})
        return {"message": "User successfully deleted."}

    raise HTTPException(
        status_code=404, detail="User not found.")


@app.get('/generate_username/{full_name}')
def generate_username(full_name: str):
    arr = full_name.split()
    first_name = arr[0]
    first_name = first_name.strip()

    counter = 100
    while counter > 0:
        random_number = random.randrange(1, 99)
        ls = [first_name, '_', str(random_number)]

        all_permutations = list(permutations(ls))
        for permu in all_permutations:
            s = "".join(permu)
            exists = users.find_one({"username": s})
            if not exists:
                return s
        counter -= 1

    if len(arr) > 1:
        last_name = arr[1]
        last_name = last_name.strip()
    while True:
        random_number = random.randrange(1, 99)
        ls = [first_name, last_name, '_', random_number]

        all_permutations = list(permutations(ls))

        for permu in all_permutations:
            s = "".join(permu)
            exists = users.find_one({"username": s})
            if not exists:
                return s


@app.post('/token')
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid credentials",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@app.get('/is_valid')
def is_valid(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except JWTError:
        return False


@app.post('/auth/google/')
def google_signup(user: GoogleSignUp):
    try:
        r = gr.Request()
        user_info = id_token.verify_token(
            user.id_token, r, audience=GOOGLE_CLIENT_ID
        )

        if user_info.get("iss") != "https://accounts.google.com":
            raise HTTPException(status_code=401, detail="Invalid issuer")

        if_exists = users.find_one({"email": user.email})
        if if_exists:
            return {"message": "Email id already exists."}

        info = {
            "full_name": user.full_name,
            "email": user.email,
            "username": user.username,
            "password": None,
            "is_active": True,
        }

        result = users.insert_one(info)

        session_token = jwt.encode(
            {"user_info": user_info}, SECRET_KEY, algorithm=ALGORITHM)

        return {"session_token": session_token}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid ID token")

@app.get('/resend_activation_link')
def resend_activation_link(email : str):
    try:
        user_exists = users.find_one({'email' : email})
        if user_exists == None:
            return {"message" : "User does not exists."}
        
        send_email(email, str(user_exists['_id']))
        
    except Exception as e:
        return {"message" : "Invalid Email id"}

@app.post('/activate_user/{token}')
def activate_user(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        if_exists = users.find_one({'_id': ObjectId(payload["user_id"])})

        if_exists["is_active"] = True
        users.update_one({'_id': if_exists['_id']}, {"$set": if_exists})
        return {"Message": "Activate the user successfully."}
    except JWTError:
        return {"message": "link is alredy expired."}


@app.get('/forgot_password/send_verification_mail')
def send_verification_mail(recipient_email : str):
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = "Change Password"
         
        data = {'user_id': recipient_email}
        expiry_time = timedelta(minutes=20)
        activation_token = create_access_token(data, expires_delta=expiry_time)
        activation_link = f"http://localhost:3000/change_password?verification_token={activation_token}"
        body = f"Click the following link to change your password: {activation_link}"
        message.attach(MIMEText(body, "plain"))

        server.sendmail(sender_email, recipient_email, message.as_string())
        server.quit()
        return {"message" : "Check Your email to change your password."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error.")


@app.post('/change_password/verification_check')
def change_password_verification(info: ChangePassword):
    try:
        user_info = jwt.decode(info.token, SECRET_KEY, algorithms=ALGORITHM)
        data = users.find_one({'email' : user_info['user_id']})
        
        updated_info = {
            "full_name" : data['full_name'],
            "username" : data['username'],
            "email" : data["email"],
            "password" : hash_password(info.password),
            'is_active':data['is_active']
        }

        result = users.update_one({'_id' : data['_id']}, {'$set' : updated_info})
        
        return {"message" : "Password has been updated successfully."}
        
    except Exception as e:
        print(e)
        return {"message" : "Link has already expired."}
