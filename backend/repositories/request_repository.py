from sqlmodel import Session, select
from models.league_model import League
from models.team_model import Team
from models.user_model import User
from models.request_model import RequestLeague

def createRequestForLeague(session: Session, request_data: RequestLeague):
    session.add(request_data)
    session.commit()
    session.refresh(request_data)
    return request_data

def getRequestsForLeagueRaw(session: Session, user_id: int): 
    stmt = (
        select(
            RequestLeague,
            Team.name,
            League.name,
            User.name,
            User.surname,
        )
        .join(Team, RequestLeague.team_id == Team.team_id)
        .join(League, RequestLeague.league_id == League.league_id)
        .join(User, RequestLeague.sender_id == User.id)
        .where(
            RequestLeague.receiver_id == user_id,
            RequestLeague.is_accepted.is_(None)  # samo zahtjevi koji nisu još odlučeni
        )
    )

    return session.exec(stmt).all()

def getPendingRequest(session: Session, team_id: int, league_id: int):
    return session.exec(
        select(RequestLeague)
        .where(
            RequestLeague.team_id == team_id,
            RequestLeague.league_id == league_id,
            RequestLeague.is_accepted.is_(None)
        )
    ).first()
