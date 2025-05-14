from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database.database import get_db
from schemas.team_schema import TeamCreate, TeamRead
from services import team_service

router = APIRouter(prefix="/teams", tags=["Teams"])


@router.post("/", response_model=TeamRead)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    try:
        return team_service.create_team(db, team)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[TeamRead])
def read_teams(db: Session = Depends(get_db)):
    return team_service.list_teams(db)


@router.get("/{team_id}", response_model=TeamRead)
def read_team(team_id: int, db: Session = Depends(get_db)):
    try:
        return team_service.retrieve_team(db, team_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
