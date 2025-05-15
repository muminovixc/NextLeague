from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from services.team_service import TeamService
from schemas.team_schema import TeamCreate, TeamRead, TeamUpdate
from database.database import engine
from sqlmodel import Session

router = APIRouter()

def get_db():
    with Session(engine) as db:
        yield db


@router.get("/team/my-team-info")
def get_my_team_info(request: Request, session: Session = Depends(get_db)):
    #ovde cu onda izvuc cookie
    cookie = request.cookies.get("user_data")
    if not cookie:
        raise HTTPException(status_code=401, detail="Unauthorized user")
    try:
        user_id = int(cookie.split("|")[0])
    except(IndexError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid cookie format")
    
    #proveravam da li je user uopste u timu
    result = session.execute(
        text("SELECT team_id FROM team_members where user_id = :user_id"),
        {"user_id": user_id}
    ).first()
    if not result:
        raise HTTPException(status_code=404, detail="User not in any team") 
    
    team_id = result[0]

    #nalazimo dalje informacije o timu tom

    team = session.execute(
        text("SELECT * FROM team where team_id = :team_id"),
        {"team_id": team_id}
    ).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    

    #nalazimo dalje statistiku u timu
    stat = session.execute(
        text("SELECT * FROM team_statistics where team_id = :team_id"),
        {"team_id": team_id}
    ).first()

    #nalazio onda i clanove tima

    members = session.execute(
        text("""
        SELECT u.id, u.name, u.surname, u.email 
        FROM users u
        JOIN team_members tm ON u.id = tm.user_id
        WHERE tm.team_id = :team_id
        """),
        {"team_id": team_id}
    ).fetchall()
    return{
         "team_info": dict(zip(team.keys(), team)) if team else {},
        "team_statistics": dict(zip(stat.keys(), stat)) if stat else {},
        "team_members": [dict(zip(m.keys(), m)) for m in members]
    }




@router.post("/team/", response_model=TeamRead) #dodavanje novog tima
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    return TeamService.create_team(db=db, team=team)

@router.get("/team/{team_id}", response_model=TeamRead)
def get_team(team_id: int, db: Session = Depends(get_db)):
    db_team = TeamService.get_team_by_id(db=db, team_id=team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return db_team

@router.get("/team/", response_model=List[TeamRead])
def get_teams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return TeamService.get_teams(db=db, skip=skip, limit=limit)

@router.put("/team/{team_id}", response_model=TeamRead)
def update_team(team_id: int, team: TeamUpdate, db: Session = Depends(get_db)):
    db_team = TeamService.update_team(db=db, team_id=team_id, team_update=team)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return db_team

@router.delete("/team/{team_id}", response_model=bool)
def delete_team(team_id: int, db: Session = Depends(get_db)):
    success = TeamService.delete_team(db=db, team_id=team_id)
    if not success:
        raise HTTPException(status_code=404, detail="Team not found")
    return success