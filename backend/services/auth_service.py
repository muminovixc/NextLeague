from sqlmodel import Session
from schemas.auth_schema import LoginRequest, RegisterRequest
from repositories import auth_repositories
from fastapi import HTTPException, Response
from hashlib import sha256
from models.user_model import User
from datetime import date

def login_user(data: LoginRequest, session: Session, response: Response):
    user = auth_repositories.get_user_by_email(session, data.email)

    if not user or user.password != sha256(data.password.encode()).hexdigest():
        raise HTTPException(status_code=401, detail="Invalid credentials")

    response.set_cookie(
        key="user_data",
        value=f"{user.id}|{user.name}|{user.surname}|{user.phone_number}|{user.email}|{user.birth_date}",
        httponly=True,
        secure=False,  # Postavi na True ako koristiš HTTPS
        samesite="Lax",
        max_age=60 * 60 * 24 * 7
    )

    return {"message": "Logged in"}

def register_user(data: RegisterRequest, session: Session):
    existing_user = auth_repositories.get_user_by_email(session, data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = sha256(data.password.encode()).hexdigest()

    new_user = User(
        name=data.name,
        surname=data.surname,
        birth_date=data.birth_date,
        email=data.email,
        password=hashed_password,
        phone_number=data.phone_number
    )

    auth_repositories.create_user(session, new_user)

    return {"message": "User registered successfully"}