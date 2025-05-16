from sqlalchemy.orm import Session
from fastapi import HTTPException
from repositories import homepage as user_repository
from schemas.homepage import UserResponse
from models.user_model import User
from schemas.homepage import LeagueRead
from repositories.homepage import get_leagues_by_user
from models.league_model import League
from models.team_model import Team

def get_logged_user(session: Session, user_id: int) -> UserResponse:
    user = user_repository.get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user  # orm_mode omogućava da ga direktno vratiš kao UserResponse

def get_league_and_team_counts(session: Session, user_id: int):
    leagues = user_repository.count_leagues_by_user(session, user_id)
    teams = user_repository.count_teams_by_user(session, user_id)
    return {"leagues": leagues, "teams": teams}



def fetch_user_leagues(session: Session, user_id: int):
    return session.query(League).filter(League.moderator_user_id == user_id).all()

def fetch_user_teams(session: Session, user_id: int):
    return session.query(Team).filter(Team.moderator_user_id == user_id).all()