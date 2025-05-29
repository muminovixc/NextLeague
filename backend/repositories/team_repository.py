from sqlmodel import Session, select
from sqlalchemy import or_
from models.team_model import Team
from models.team_model import TeamStatistic
from models.user_model import User
from models.team_members_models import TeamMembers

from typing import List, Optional
# ovde uradi isti upit samo da je moderator_user_id == user_id

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


def createTeam(db: Session, team: Team, user_id: int):
    try:
        db.add(team)
        db.commit()
        db.refresh(team)
        return team
    except Exception as e:
        db.rollback() 
        raise e


def GetAllTeams(db: Session):
    statement = select(Team)
    results = db.exec(statement)
    return results.all()

def getTeamById(db: Session, team_id: int):
    statement = (
        select(Team, TeamStatistic)
        .join(TeamStatistic, Team.team_id == TeamStatistic.team_id)
        .where(Team.team_id == team_id)
    )
    result = db.exec(statement).first()
    
    if not result:
        return None
    
    team, team_statistic = result
    
    # Konvertuj u dictionary format
    return [
        team.dict() if team else None,
        team_statistic.dict() if team_statistic else None
    ]
#def getTeamStatistic(db: Session, team_id: int):
  #  statement = select(Team).where(Team.team_id == team_id)
  #  results = db.exec(statement)
  #  return results.first()

def getTeamMembers(db: Session, team_id: int):
    statement = (
        select(User.id, User.name, User.surname)
        .join(TeamMembers, User.id == TeamMembers.user_id)
        .where(TeamMembers.team_id == team_id)
    )
    results = db.exec(statement)
    return results.all()