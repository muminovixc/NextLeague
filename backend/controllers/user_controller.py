from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session
from typing import Optional
from database.database import engine
from services import user_service
from schemas.user_schema import UserUpdate


def get_db():
    with Session(engine) as db:
        yield db

router = APIRouter(prefix="/user", tags=["users"])


@router.get("/my_profile")
def get_my_profile(request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")

    return user_service.get_my_profile(session, token)


@router.put("/my_profile")
def update_my_profile(request: Request, user_data: UserUpdate, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")

    return user_service.update_my_profile(session, user_data, token)