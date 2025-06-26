from repositories import team_repository as TeamRepository
from schemas.team_schema import TeamCreate, TeamUpdate
from fastapi import HTTPException
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


def createTeam(db: Session, team: Team, token: str):
    try:
        statement = decode_access_token(token)
        user_id = statement.get("id")
        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="User ID not found in token."
            )

        # Postavi moderatora
        team.moderator_user_id = user_id

        # Dodaj tim i commitaj da dobije team_id
        db.add(team)
        db.commit()
        db.refresh(team)

        # Dodaj moderatora kao člana tima
        member = TeamMembers(user_id=user_id, team_id=team.team_id)
        db.add(member)

        # Dodaj inicijalnu statistiku
        statistic = TeamStatistic(
            moderator_user_id=user_id,
            team_id=team.team_id,
            league_id=None,  # Ako se naknadno doda liga
            number_of_matches_played=0,
            number_of_wins=0,
            number_of_draws=0,
            number_of_losses=0,
            win_points=0,
            lose_points=0,
            difference_points=0,
            points=0
        )
        db.add(statistic)

        db.commit()
        return team

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        error_msg = str(e)
        print(f"Error creating team: {error_msg}")

        if "maksimalan broj timova" in error_msg.lower():
            raise HTTPException(
                status_code=400,
                detail="Dostigli ste maksimalan broj timova koji možete kreirati."
            )

        if "psycopg2.errors.RaiseException" in error_msg:
            if "korisnik regular je dostigao maksimalan broj timova" in error_msg.lower():
                raise HTTPException(
                    status_code=400,
                    detail="Dostigli ste maksimalan broj timova koji možete kreirati."
                )

        raise HTTPException(
            status_code=500,
            detail=f"Greška prilikom kreiranja tima: {error_msg}"
        )
    
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