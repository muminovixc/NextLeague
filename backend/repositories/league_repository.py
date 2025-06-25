from datetime import datetime, timedelta
from fastapi import HTTPException
from sqlmodel import Session, select
from models.request_model import RequestLeague
from models.team_model import TeamStatistic
from models.league_model import Calendar, League, LeagueStatistic, LeagueTeam,LeagueTeamStatisticsView
from schemas.league_schema import AddTeamInLeague, LeagueCreate

def getMyLeagues(db: Session, user_id: int):
    # Filtriramo sve lige koje pripadaju korisniku sa user_id
    statement = select(League).where(League.moderator_user_id == user_id)
    results = db.exec(statement)
    return results.all()

def getAllLeagues(db: Session, limit: int, offset: int):
    statement = select(League).offset(offset).limit(limit)
    results = db.exec(statement)
    return results.all()

def getLeaguesStatistic(db: Session, league_id: int):
    statement = select(LeagueTeamStatisticsView).where(LeagueTeamStatisticsView.league_id == league_id)
    results = db.exec(statement)
    return results.all()

def createMyLeague(session: Session, user_id: int, data: LeagueCreate):
    new_league = League(
        moderator_user_id=user_id,
        name=data.name,
        sport=data.sport,
        number_of_teams=data.number_of_teams,
        number_of_players_in_team=data.number_of_players_in_team,
        country=data.country,
        access=data.access
    )
    session.add(new_league)
    session.commit()
    session.refresh(new_league)
    return new_league

def deleteMyLeague(session: Session, user_id: int, league_id: int) -> bool:
    league = session.get(League, league_id) #ovo staviti u service provjeru

    if not league or league.moderator_user_id != user_id:
        return False  

    session.delete(league)
    session.commit()
    return True
    
def getLeagueById(session: Session, league_id: int) -> League | None:
    statement = select(League).where(
        League.league_id == league_id,
    )
    result = session.exec(statement).first()
    return result

def get_leagues_for_user(db:Session, user_id: int):
    statement = select(League).where(League.moderator_user_id == user_id)
    results = db.exec(statement)
    return results.all()

def addTeamInLeague(session: Session, data: AddTeamInLeague):
    # 1. Dodaj u league_teams
    entry = LeagueTeam(
        league_id=data.league_id,
        team_id=data.team_id
    )
    session.add(entry)

    # (Radimo samo ažuriranje zato što kad se napravi Team automatski budu inicijalizirane sve vrijednosti na 0 osim league_id koji bude None)
    # 2. Ažuriraj league_id u team_statistic
    stat_stmt = select(TeamStatistic).where(TeamStatistic.team_id == data.team_id)
    stat_result = session.exec(stat_stmt).first()

    if not stat_result:
        raise HTTPException(status_code=404, detail="TeamStatistic not found")

    stat_result.league_id = data.league_id
    session.add(stat_result)

    # 3. Dodaj novi zapis u league_statistic
    league_stat_entry = LeagueStatistic(
        league_id=data.league_id,
        team_id=data.team_id,
        moderator_user_id=data.sender_id,
        team_statistic_id=stat_result.team_statistic_id
    )
    session.add(league_stat_entry)

    # 4. Ažuriraj odgovarajući zahtjev (RequestLeague)
    request_stmt = select(RequestLeague).where(RequestLeague.id == data.request_id)
    request_obj = session.exec(request_stmt).first()

    if not request_obj:
        raise HTTPException(status_code=404, detail="Request not found")

    request_obj.is_reviewed = True
    request_obj.is_accepted = True
    session.add(request_obj)

    session.commit()
    return {"message": "Team successfully added to league and statistics updated"}


def get_team_ids_in_league(session: Session, league_id: int) -> list[int]:
    stmt = select(LeagueTeam.team_id).where(LeagueTeam.league_id == league_id)
    results = session.exec(stmt).all()
    return [r for r in results]

def calendar_exists_for_league(session: Session, league_id: int) -> bool:
    result = session.exec(
        select(Calendar).where(Calendar.league_id == league_id)
    ).first()
    return result is not None
