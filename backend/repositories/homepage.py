from sqlalchemy.orm import Session
from models.user_model import User

def get_user_by_id(session: Session, user_id: int) -> User | None:
    return session.query(User).filter(User.id == user_id).first()
