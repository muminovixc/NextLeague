from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session
from typing import List
from services import team_service
from models.team_members_models import TeamMembers
from models.user_model import User
from schemas.team_schema import TeamStatisticOut
from schemas.team_schema import TeamMemberSchema
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
def GetAllTeams(request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return team_service.GetAllTeams(session,token)

@router.get("/getTeamStatistic/{team_id}", response_model=list[TeamStatisticOut])
def getTeamStatistic(team_id: int, request: Request, session: Session = Depends(get_db)):
    return team_service.getTeamStatistic(session, team_id)



@router.get("/getTeamById/{team_id}")
def getTeamById1111(team_id: int, request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return team_service.getTeamById1111(session, team_id)


@router.get("/{team_id}/getTeamMembers", response_model=List[TeamMemberSchema])
def getTeamMembers(team_id: int, request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    

    
    return team_service.getTeamMembers(db, team_id, token)


@router.get("/view/{team_id}")
def getTeamById(team_id: int, request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return team_service.getTeamById(session, team_id)