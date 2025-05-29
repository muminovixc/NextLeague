from repositories import team_repository as TeamRepository
from schemas.team_schema import TeamCreate, TeamUpdate
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
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
    
def GetAllTeams(db: Session,token: str):
    try:
        print(f"Received token: {token}")
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        print(f"Decoded user_id: {user_id}")
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
    return TeamRepository.GetAllTeams(db)


def getTeamMembers(db: Session, team_id: int, token: str):
    try:
        print(f"Received token: {token}")
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        print(f"Decoded user_id: {user_id}")
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
    return TeamRepository.getTeamMembers(db, team_id)

def getTeamById(db: Session, team_id: int):
    try:
        print(f"Received team_id: {team_id}")
        if not team_id:
            raise Exception("Team ID not found.")
        print(f"Decoded team_id: {team_id}")
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
    return TeamRepository.getTeamById(db, team_id)

def getTeamStatistic(db: Session, team_id: int):
    return TeamRepository.getTeamStatistic(db, team_id)


def createTeam(db: Session, team: TeamCreate, token: str):
    try:
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise HTTPException(
                status_code=401, 
                detail="User ID not found in token."
            )

        team.moderator_user_id = user_id
        return TeamRepository.createTeam(db, team, user_id)
    
    except HTTPException:
        # Re-raise HTTPException as is
        raise
    
    except Exception as e:
        error_msg = str(e)
        print(f"Error creating team: {error_msg}")
        
        # Provjeri da li je greška povezana sa maksimalnim brojem timova
        if "maksimalan broj timova" in error_msg.lower():
            raise HTTPException(
                status_code=400, 
                detail="Dostigli ste maksimalan broj timova koji možete kreirati."
            )
        
        # Provjeri da li je SQLAlchemy/PostgreSQL greška
        if "psycopg2.errors.RaiseException" in error_msg:
            if "korisnik regular je dostigao maksimalan broj timova" in error_msg.lower():
                raise HTTPException(
                    status_code=400,
                    detail="Dostigli ste maksimalan broj timova koji možete kreirati."
                )
        
        # Za sve ostale greške
        raise HTTPException(
            status_code=500, 
            detail=f"Greška prilikom kreiranja tima: {error_msg}"
        )