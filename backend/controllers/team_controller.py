from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, File, Form
from sqlmodel import Session
from typing import Optional
from typing import List
from services import team_service
from models.team_members_models import TeamMembers
from models.team_model import Team
from models.user_model import User
from schemas.team_schema import TeamStatisticOut
from schemas.team_schema import TeamMemberSchema
from database.database import engine
import os



def get_db():
    with Session(engine) as db:
        yield db
router = APIRouter(prefix="/team", tags=["teams"])


static_folder = "images/team"
os.makedirs(static_folder, exist_ok=True)


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


@router.post("/createTeam")
def create_team(
    name: str = Form(...),
    team_sport: str = Form(...),
    country: str = Form(...),
    team_identification: Optional[str] = Form(None),
    team_logo: Optional[UploadFile] = File(None),
    request: Request = None,
    session: Session = Depends(get_db)
):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")

    return team_service.create_team_with_logo(
        db=session,
        token=token,
        name=name,
        team_sport=team_sport,
        country=country,
        team_identification=team_identification,
        team_logo=team_logo
    )


@router.delete("/deleteMyTeam/{team_id}")
def deleteTeam(team_id: int, request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return team_service.deleteTeam(session, team_id, token)


@router.get("/getMyTeamsModeratorFiltered")
def getMyTeamsModeratorFiltered(league_sport: str, request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")

    return team_service.getMyTeamsModeratorFiltered(session, token, league_sport)

@router.get("/calendar/team/{team_id}")
def get_calendar_for_team(team_id: int, session: Session = Depends(get_db)):
    return team_service.get_calendar_for_team(session, team_id)
