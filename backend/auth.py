from fastapi import APIRouter, Response, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from models import User
from database import engine
import hashlib

router = APIRouter()

@router.post("/login")
def login_user(email: str, password: str, response: Response):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == email)).first()
        if not user or user.password != hashlib.sha256(password.encode()).hexdigest():
            raise HTTPException(status_code=401, detail="Invalid credentials")

        response.set_cookie(
            key="user_data",
            value=f"{user.id}|{user.name}|{user.email}",
            httponly=True,
            secure=False,  # Stavi True ako koristiš HTTPS
            samesite="Lax",
            max_age=60 * 60 * 24 * 7  # 7 dana
        )

        return {"message": "Logged in"}