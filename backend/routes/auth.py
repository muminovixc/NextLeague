from fastapi import APIRouter, Response, HTTPException
from fastapi.responses import JSONResponse
from fastapi import Body
from sqlmodel import Session, select
from NextLeague.backend.models.models import User
from NextLeague.backend.database.database import engine
from hashlib import sha256
from NextLeague.backend.schemas.auth import LoginRequest  
from NextLeague.backend.schemas.auth import RegisterRequest
#U OVOM FOLDERU PRAVIMO I league.py, team.py da odvojim kod i kasnije ih importamo u main

router = APIRouter()
#dobar
@router.post("/login")
def login_user(data: LoginRequest, response: Response):
    print(data)
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == data.email)).first()
        if not user or user.password != sha256(data.password.encode()).hexdigest():
            raise HTTPException(status_code=401, detail="Invalid credentials")

        response.set_cookie(
            key="user_data",
            value=f"{user.id}|{user.name}|{user.surname}|{user.phone_number}|{user.email}|{user.birth_date}",
            httponly=True,
            secure=False,  # True ako koristiš HTTPS
            samesite="Lax",
            max_age=60 * 60 * 24 * 7
        )

        return {"message": "Logged in"}


@router.post("/register")
def register_user(data: RegisterRequest):
    with Session(engine) as session:
        # Provjeri da li već postoji korisnik s tim emailom
        existing_user = session.exec(select(User).where(User.email == data.email)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hashuj password
        hashed_password = sha256(data.password.encode()).hexdigest()

        new_user = User(
            name=data.name,
            surname=data.surname,
            birth_date=data.birth_date,
            email=data.email,
            password=hashed_password,
            phone_number=data.phone_number
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return {"message": "User registered successfully"}