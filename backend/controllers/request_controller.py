from fastapi import APIRouter, HTTPException, Request, Depends
from sqlmodel import Session
from database.database import engine
import services.request_service as request_service
from services import request_team_service
from schemas.request_schema import RequestTeamExtended


def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/request", tags=["Requests"])

@router.post("/createRequestForLeague")
def createRequestForLeague(request: Request, body: dict, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return request_service.createRequestForLeague(session, token, body)

@router.get("/getRequestsForLeague")
def getRequestsForLeague(request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return request_service.getRequestsForLeague(session, token)

@router.post("/createRequestForTeam")
def create_request_for_team(request: Request, body: dict, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    print("PRIMLJENO TIJELO: ", body)
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return request_team_service.create_request_for_team(session, token, body)

@router.get("/getRequestsForTeam", response_model=list[RequestTeamExtended])
def get_requests_for_team(request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return request_team_service.get_requests_for_team(session, token)

@router.post("/acceptRequest")
def accept_request(body: dict, db: Session = Depends(get_session)):
    request_id = body.get("request_id")
    return request_team_service.accept_request(db, request_id)

@router.post("/declineRequest")
def decline_request(body: dict, db: Session = Depends(get_session)):
    request_id = body.get("request_id")
    return request_team_service.decline_request(db, request_id)