from sqlmodel import Session, select
from sqlalchemy import or_
from models.team_model import Team
from models.team_model import TeamStatistic
from models.user_model import User, UserChart
from models.league_model import League
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
 #   statement = select(Team).where(Team.team_id == team_id)
   # results = db.exec(statement)
    #return results.first()

def getTeamMembers(db: Session, team_id: int):
    statement = (
        select(User)
        .join(TeamMembers, User.id == TeamMembers.user_id)
        .where(TeamMembers.team_id == team_id)
    )
    users = db.exec(statement).all()
    result = []
    for user in users:
        charts = db.exec(select(UserChart).where(UserChart.player_id == user.id)).all()
        user_dict = user.dict(include={"id", "name", "surname", "profile_picture"})
        user_dict["charts"] = [chart.dict() for chart in charts]
        result.append(user_dict)
    return result

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

def get_teams_for_user(db:Session, user_id: int):
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
