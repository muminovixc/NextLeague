from sqlalchemy.orm import Session
from models.user_model import User
from models.league_model import League
from models.team_model import Team

def get_user_by_id(session: Session, user_id: int) -> User | None:
    return session.query(User).filter(User.id == user_id).first()

def count_leagues_by_user(session: Session, user_id: int) -> int:
    return session.query(League).filter(League.moderator_user_id == user_id).count()

def count_teams_by_user(session: Session, user_id: int) -> int:
    return session.query(Team).filter(Team.moderator_user_id == user_id).count()

def get_leagues_by_user(db: Session, user_id: int):
    return db.query(League).filter(League.moderator_user_id == user_id).all()
