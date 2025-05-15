from sqlmodel import Session, select
from models.team_model import Team


def create_team(db: Session, team: Team) -> Team:
    db.add(team)
    db.commit()
    db.refresh(team)
    return team


def get_all_teams(db: Session):
    return db.exec(select(Team)).all()


def get_team_by_id(db: Session, team_id: int):
    return db.get(Team, team_id)
