from fastapi import APIRouter, Depends, Request,HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session
from auth.jwt_utils import decode_access_token
from services import league_service
from models.league_model import League
from schemas.league_schema import AddTeamInLeague, StartLeagueRequest, TeamStatisticOut, LeagueCreate
from database.database import engine

def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/league", tags=["Leagues"])

@router.get("/getMyLeagues")
def getMyLeagues(request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')  # Dobijamo JWT token iz kolačića
    
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return league_service.getMyLeagues(session, token)

@router.get("/getAllLeagues")
def getAllLeagues(request: Request, limit: int = 10, offset: int = 0, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return league_service.getAllLeagues(session, limit = limit, offset = offset)

@router.get("/getLeaguesStatistic/{league_id}", response_model=list[TeamStatisticOut])
def getLeaguesStatistic(league_id: int, request: Request, session: Session = Depends(get_session)):
    return league_service.getLeaguesStatistic(session, league_id)

@router.post("/createMyLeague")
def createMyLeague(data: LeagueCreate, request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    print(data)
    return league_service.createMyLeague(session, token, data)

@router.delete("/deleteMyLeague/{league_id}")
def deleteMyLeague(league_id: int, request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return league_service.deleteMyLeague(session, token, league_id)

@router.get("/getLeagueById/{league_id}", response_model = League)
def getLeagueById(league_id: int, request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return league_service.getLeagueById(session,token,league_id)


@router.post("/addTeamInLeague")
def addTeamInLeague(data: AddTeamInLeague, request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return league_service.addTeamInLeague(session, token, data)

@router.post("/start")
def start_league(data: StartLeagueRequest, request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return league_service.start_league(session, token, data.league_id)

@router.get("/getUserId")
def get_user_id(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return JSONResponse(status_code=401, content={"detail": "Token missing"})

    payload = decode_access_token(token)
    if not payload:
        return JSONResponse(status_code=401, content={"detail": "Invalid token"})

    return {"user_id": payload.get("id")}

@router.get("/getCalendarForLeague/{league_id}")
def getCalendarForLeague(league_id: int, request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    return league_service.getCalendarForLeague(session, league_id)

