from fastapi import APIRouter, Depends, Request,HTTPException
from sqlmodel import Session
from services import league_service
from schemas.league_schema import TeamStatisticOut, LeagueCreate
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
def getAllLeagues(request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get('access_token')

    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return league_service.getAllLeagues(session)

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