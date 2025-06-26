from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.statistics_schema import TeamPlayersResponse, PlayerInfo
from database.database import get_session
from models.team_members_models import TeamMembers
from models.user_model import User
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session  
from services.statistics_service import get_team_players_info_service
from services.statistics_service import get_team_statistic_service
from schemas.statistics_schema import TeamStatResponse



router = APIRouter(prefix="/statistics", tags=["Statistics"]) 


@router.get("/players-info/{team_id}", response_model=TeamPlayersResponse)
def get_team_players_info(team_id: int, db: Session = Depends(get_session)):
    return get_team_players_info_service(db, team_id)


@router.get("/team/{team_id}", response_model=TeamStatResponse)
def get_team_statistic(team_id: int, db: Session = Depends(get_session)):
    return get_team_statistic_service(db, team_id)
