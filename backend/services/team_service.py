from repositories import team_repository as TeamRepository
from schemas.team_schema import TeamCreate, TeamUpdate
from sqlmodel import Session
from models import team_model
from typing import List, Optional
from auth.jwt_utils import decode_access_token

def getMyTeams(db: Session, token: str):  
    try:
        print(f"Received token: {token}")
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        print(f"Decoded user_id: {user_id}")
        return TeamRepository.getMyTeams(db, user_id)
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
    
def getTeamById(db: Session, team_id: int):
    return TeamRepository.getTeamById(db, team_id)

def getTeamStatistic(db: Session, team_id: int):
    return TeamRepository.getTeamStatistic(db, team_id)

def getAllTeams(db: Session):
    return TeamRepository.getAllTeams(db)
