from sqlmodel import Session, select
from models.league_model import League,LeagueTeamStatisticsView
from schemas.league_schema import LeagueCreate

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

def get_leagues_for_user(db, user_id: int):
    statement = select(League).where(League.moderator_user_id == user_id)
    results = db.exec(statement)
    return results.all()