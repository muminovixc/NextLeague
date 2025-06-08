from sqlmodel import Session, select
from models.user_model import User
from schemas.user_schema import UserUpdate
from fastapi import HTTPException
import bcrypt


def get_user_by_id(db: Session, user_id: int) -> User:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def update_user(db: Session, user_id: int, updates: UserUpdate) -> User:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = updates.dict(exclude_unset=True)

    if 'password' in update_data and update_data['password']:
        salt = bcrypt.gensalt()
        update_data['password'] = bcrypt.hashpw(update_data['password'].encode(), salt).decode()
    elif 'password' in update_data:
        del update_data['password']  # remove if empty

    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user
