from sqlmodel import Session
from repositories import user_repository
from typing import List
from models.user_model import User

def get_users(session: Session, offset: int = 0, limit: int = 100) -> List[User]:
    return user_repository.get_users(session, offset, limit)