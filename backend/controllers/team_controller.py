from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session
from typing import List
from services import team_service
from schemas.team_schema import TeamStatisticOut
from database.database import engine




def get_db():
    with Session(engine) as db:
        yield db
router = APIRouter(prefix="/team", tags=["teams"])



@router.get("/getMyTeams")
def getMyTeams(request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return team_service.getMyTeams(session, token)

@router.get("/getAllTeams")
def getAllTeams(request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return team_service.getAllTeams(session)

@router.get("/getTeamStatistic/{team_id}", response_model=list[TeamStatisticOut])
def getTeamStatistic(team_id: int, request: Request, session: Session = Depends(get_db)):
    return team_service.getTeamStatistic(session, team_id)



@router.get("/getTeamById/{team_id}")
def getTeamById(team_id: int, request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return team_service.getTeamById(session, team_id)
