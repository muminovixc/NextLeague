from sqlmodel import Session, select
from models.request_model import RequestLeague, RequestTeam
from models.league_model import League
from models.team_model import Team
from models.user_model import User
from schemas.request_schema import RequestTeamExtended
from models.request_model import RequestLeague

def createRequestForLeague(session: Session, request_data: RequestLeague):
    session.add(request_data)
    session.commit()
    session.refresh(request_data)
    return request_data

def getRequestsForLeague(session: Session, user_id: int):
    statement = select(RequestLeague).where(RequestLeague.receiver_id == user_id)
    return session.exec(statement).all()

def createRequestForTeam(session: Session, request_data: RequestTeam):
    session.add(request_data)
    session.commit()
    session.refresh(request_data)
    return request_data

def getRequestsForTeam(session: Session, user_id: int):
    stmt = (
        select(
            RequestTeam,
            User.name,
            User.surname,
            Team.name
        )
        .join(User, RequestTeam.sender_id == User.id)
        .join(Team, RequestTeam.team_id == Team.team_id)
        .where(
            RequestTeam.receiver_id == user_id,
            RequestTeam.is_accepted.is_(None)
        )
    )

    results = session.exec(stmt).all()

    return [
        RequestTeamExtended(
            id=req.id,
            sender_id=req.sender_id,
            receiver_id=req.receiver_id,
            team_id=req.team_id,
            is_reviewed=req.is_reviewed,
            is_accepted=req.is_accepted,
            sender_name=name,
            sender_surname=surname,
            team_name=team_name
        )
        for req, name, surname, team_name in results
    ]



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

def getSentRequestsForLeague(session: Session, user_id: int):
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
        .join(User, RequestLeague.receiver_id == User.id)
        .where(RequestLeague.sender_id == user_id)
    )

    return session.exec(stmt).all()

