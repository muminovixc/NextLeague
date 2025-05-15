from sqlmodel import Session, select
from models.league_model import League, LeagueStatistic,LeagueTeamStatisticsView

def getMyLeagues(db: Session, user_id: int):
    # Filtriramo sve lige koje pripadaju korisniku sa user_id
    statement = select(League).where(League.moderator_user_id == user_id)
    results = db.exec(statement)
    return results.all()

def getAllLeagues(db: Session):
    statement = select(League)
    results = db.exec(statement)
    return results.all()

def getLeaguesStatistic(db: Session, league_id: int):
    statement = select(LeagueTeamStatisticsView).where(LeagueTeamStatisticsView.league_id == league_id)
    results = db.exec(statement)
    return results.all()