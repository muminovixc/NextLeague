from sqlmodel import Session, select
from sqlalchemy import or_
from sqlalchemy.orm import aliased

from models.team_model import Team
from models.team_model import TeamStatistic
from models.user_model import User
from models.league_model import League
from models.league_model import Calendar

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

        member = TeamMembers(user_id=user_id, team_id=team.team_id)
        db.add(member)

        statistic = TeamStatistic(
            moderator_user_id=user_id,
            team_id=team.team_id,
            league_id=None,  
            number_of_matches_played=0,
            number_of_wins=0,
            number_of_draws=0,
            number_of_losses=0,
            win_points=0,
            lose_points=0,
            difference_points=0,
            points=0
        )
        db.add(statistic)

        db.commit()

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
        select(Team, TeamStatistic,League)
        .join(TeamStatistic, Team.team_id == TeamStatistic.team_id)
.outerjoin(League, TeamStatistic.league_id == League.league_id) 
        .where(Team.team_id == team_id)
    )
    result = db.exec(statement).first()
    
    if not result:
        return None
    
    team, team_statistic,league = result
    
    return [
        team.dict() if team else None,
        team_statistic.dict() if team_statistic else None,
        league.dict() if league else None
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

def deleteTeam(db: Session, team_id: int,user_id: int):
    statement = select(Team).where(
    (Team.team_id == team_id) & (Team.moderator_user_id == user_id)
)
    team = db.exec(statement).first()
    
    if not team:
        return None
    
    db.delete(team)
    db.commit()
    return team 

def get_teams_for_user(db, user_id: int):
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
def getTeamsByModeratorAndSport(db: Session, user_id: int, sport: str):
    statement = select(Team).where(
        Team.moderator_user_id == user_id,
        Team.team_sport == sport
    )
    results = db.exec(statement).all()
    return results


def get_calendar_by_team_id(session: Session, team_id: int):
    TeamOne = aliased(Team)
    TeamTwo = aliased(Team)

    stmt = (
        select(
            Calendar,
            TeamOne.name.label("team_one_name"),
            TeamTwo.name.label("team_two_name")
        )
        .join(TeamOne, Calendar.team_one_id == TeamOne.team_id)
        .join(TeamTwo, Calendar.team_two_id == TeamTwo.team_id)
        .where((Calendar.team_one_id == team_id) | (Calendar.team_two_id == team_id))
        .order_by(Calendar.date.asc())
    )

    results = session.exec(stmt).all()

    matches = []
    for calendar, team_one_name, team_two_name in results:
        matches.append({
            "id": calendar.id,
            "league_id": calendar.league_id,
            "team_one_id": calendar.team_one_id,
            "team_two_id": calendar.team_two_id,
            "date": calendar.date,
            "status": calendar.status,
            "statistic_after_match_id": calendar.statistic_after_match_id,
            "team_one_name": team_one_name,
            "team_two_name": team_two_name,
            "result": None,  # ili generiši na osnovu podataka
            "location": "Online"  # ako nemaš polje za lokaciju
        })

    return matches