from sqlalchemy.exc import IntegrityError
from sqlmodel import Session
from schemas.team_schema import TeamCreate
from models.team_model import Team
from repositories import team_repository


def create_team(db: Session, team_data: TeamCreate):
    team = Team(**team_data.dict())
    try:
        return team_repository.create_team(db, team)
    except IntegrityError:
        raise ValueError("Team with that identification already exists.")


def list_teams(db: Session):
    return team_repository.get_all_teams(db)


def retrieve_team(db: Session, team_id: int):
    team = team_repository.get_team_by_id(db, team_id)
    if not team:
        raise ValueError("Team not found.")
    return team
