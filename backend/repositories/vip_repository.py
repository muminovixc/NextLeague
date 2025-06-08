from sqlalchemy.orm import Session  # SQLAlchemy
from sqlalchemy.future import select
from models.user_model import User

def update_user_type(session: Session, user_id: int, user_type: int):
    user = session.execute(select(User).where(User.id == user_id)).scalar_one_or_none()
    if user:
        user.user_type_id = user_type
        session.add(user)
        session.commit()
        session.refresh(user)
    return user
