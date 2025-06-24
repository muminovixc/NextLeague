from sqlmodel import Session, select
from models.request_model import RequestLeague, RequestTeam

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
    return session.exec(
        select(RequestTeam).where(RequestTeam.receiver_id == user_id)
    ).all()