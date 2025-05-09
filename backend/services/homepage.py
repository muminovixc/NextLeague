from sqlalchemy.orm import Session
from fastapi import HTTPException
from repositories import homepage as user_repository
from schemas.homepage import UserResponse
from models.user_model import User


def get_logged_user(session: Session, user_id: int) -> UserResponse:
    user = user_repository.get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user  # orm_mode omogućava da ga direktno vratiš kao UserResponse
