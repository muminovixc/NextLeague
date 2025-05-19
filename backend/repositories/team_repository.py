from sqlmodel import Session, select
from sqlalchemy import or_
from models.team_model import Team
from models.user_model import User
from models.team_members_models import TeamMembers

from typing import List, Optional


def getMyTeams(db: Session, user_id: int):
    
    statement = (
        select(Team)
        .join(TeamMembers, TeamMembers.team_id == Team.team_id, isouter=True)
        .where(
            or_(
                Team.moderator_user_id == user_id,
                TeamMembers.user_id == user_id
            )
        )
        .distinct()
    )    
    results = db.exec(statement)
    return results.all()

def GetAllTeams(db: Session):
    statement = select(Team)
    results = db.exec(statement)
    return results.all()

def getTeamById(db: Session, team_id: int):
    statement = select(Team).where(Team.team_id == team_id)
    results = db.exec(statement)
    return results.first()

def getTeamStatistic(db: Session, team_id: int):
    statement = select(Team).where(Team.team_id == team_id)
    results = db.exec(statement)
    return results.first()

def getTeamMembers(db: Session, team_id: int):
    statement = (
        select(User.id, User.name, User.surname)
        .join(TeamMembers, User.id == TeamMembers.user_id)
        .where(TeamMembers.team_id == team_id)
    )
    results = db.exec(statement)
    return results.all()