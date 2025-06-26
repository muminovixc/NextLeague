from repositories import team_repository as TeamRepository
from schemas.team_schema import TeamCreate, TeamUpdate
from fastapi import HTTPException, UploadFile, File
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session
from models.team_model import Team,TeamStatistic
from models.team_members_models import TeamMembers
from typing import List, Optional
from auth.jwt_utils import decode_access_token
import traceback


def getMyTeams(db: Session, token: str):  
    try:
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")

        teams = TeamRepository.getMyTeams(db, user_id)
        return {
            "user_id": user_id,
            "teams": teams
        }

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

def deleteTeam(db: Session, team_id: int, token: str):
    try:
        decoded = decode_access_token(token)
        if not decoded or "id" not in decoded:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        user_id = decoded["id"]

        print("Decoded user ID:", user_id)
        print("Team ID to delete:", team_id)

        result = TeamRepository.deleteTeam(db, team_id, user_id)
        print("Deletion result:", result)
        return result

    except HTTPException:
        raise
    except Exception as e:
        print("Exception in deleteTeam:")
        print(traceback.format_exc())  # Dodaj ovo
        raise HTTPException(
            status_code=500,
            detail=f"Greška prilikom brisanja tima: {str(e)}"
        )


def create_team_with_logo(
    db: Session,
    token: str,
    name: str,
    team_sport: str,
    country: str,
    team_identification: Optional[str],
    team_logo: Optional[UploadFile]
):
    try:
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in token.")

        return TeamRepository.createTeam(
            db=db,
            user_id=user_id,
            name=name,
            team_sport=team_sport,
            country=country,
            team_identification=team_identification,
            team_logo=team_logo
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
def getMyTeamsModeratorFiltered(db: Session, token: str, league_sport: str):
    try:
        decoded = decode_access_token(token)
        user_id = decoded.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        return TeamRepository.getTeamsByModeratorAndSport(db, user_id, league_sport)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Greška: {str(e)}")


def get_calendar_for_team(session: Session, team_id: int):
    return TeamRepository.get_calendar_by_team_id(session, team_id)