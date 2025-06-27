from sqlmodel import Session, select
from fastapi import UploadFile, File
from sqlalchemy import or_
from models.team_model import Team
from models.team_model import TeamStatistic
from models.user_model import User, UserChart
from models.league_model import Calendar, League, StatisticAfterMatch
from models.team_members_models import TeamMembers
import os;
import shutil;

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


def createTeam(
   db: Session,
    user_id: int,
    name: str,
    team_sport: str,
    country: str,
    team_identification: Optional[str],
    team_logo: Optional[UploadFile]
):
    try:
        logo_path = None
        if team_logo:
            folder_path = "images/team"
            os.makedirs(folder_path, exist_ok=True)
            filename = f"{name.lower().replace(' ', '_')}_{team_logo.filename}"
            full_path = os.path.join(folder_path, filename)
            with open(full_path, "wb") as buffer:
                shutil.copyfileobj(team_logo.file, buffer)
            logo_path = f"/images/team/{filename}"

        team = Team(
            name=name,
            team_sport=team_sport,
            country=country,
            team_identification=team_identification,
            team_logo=logo_path,
            moderator_user_id=user_id
        )

        db.add(team)
        db.commit()
        db.refresh(team)

        db.add(TeamMembers(user_id=user_id, team_id=team.team_id))
        db.add(TeamStatistic(
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
        ))
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

def get_calendar_by_team_id(db: Session, team_id: int):
    statement = select(Calendar).where(
        or_(
            Calendar.team_one_id == team_id,
            Calendar.team_two_id == team_id
        )
    )
    results = db.exec(statement).all()

    calendar_with_data = []

    for match in results:
        team_one = db.get(Team, match.team_one_id)
        team_two = db.get(Team, match.team_two_id)

        match_data = {
            "id": match.id,
            "date": match.date,
            "status": match.status,
            "league_id": match.league_id,
            "team_one": {
                "id": team_one.team_id,
                "name": team_one.name,
                "logo": team_one.team_logo,  
            },
            "team_two": {
                "id": team_two.team_id,
                "name": team_two.name,
                "logo": team_two.team_logo, 
            },
        }

        if match.statistic_after_match_id:
            stat = db.get(StatisticAfterMatch, match.statistic_after_match_id)
            if stat:
                match_data["statistic"] = {
                    "winner_id": stat.winner_id,
                    "looser_id": stat.looser_id,
                    "win_points": stat.win_points,
                    "lose_points": stat.lose_points,
                    "best_player_id": stat.best_player_id,
                    "event_time": stat.event_time
                }

        calendar_with_data.append(match_data)

    return calendar_with_data