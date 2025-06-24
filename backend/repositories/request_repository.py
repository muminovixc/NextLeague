from sqlmodel import Session, select
from models.request_model import RequestLeague

def createRequestForLeague(session: Session, request_data: RequestLeague):
    session.add(request_data)
    session.commit()
    session.refresh(request_data)
    return request_data

def getRequestsForLeague(session: Session, user_id: int):
    statement = select(RequestLeague).where(RequestLeague.receiver_id == user_id)
    return session.exec(statement).all()
