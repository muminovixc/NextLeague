from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session
from repositories import league_repository
from models.league_model import League
from schemas.league_schema import TeamStatisticOut,LeagueCreate
from auth.jwt_utils import decode_access_token

def getMyLeagues(session: Session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        return league_repository.getMyLeagues(session, user_id)
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
    
def getAllLeagues(session: Session, limit: int, offset: int):
    #results = leagu_repository...
    return league_repository.getAllLeagues(session, limit = limit, offset = offset)

def getLeaguesStatistic(session: Session, league_id: int) -> list[TeamStatisticOut]:
    results = league_repository.getLeaguesStatistic(session, league_id)
    return [TeamStatisticOut.from_orm(row) for row in results]

def createMyLeague(session: Session, token: str, data: LeagueCreate):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")

        return league_repository.createMyLeague(session, user_id, data)
    except Exception as e:
        error_message = str(e)
        if (
            "check_user_moderation_limits" in error_message or 
            "dostigao maksimalan broj liga" in error_message
        ):
            raise HTTPException(status_code=403, detail="PREMIUM_REQUIRED")
        raise HTTPException(status_code=400, detail=str(e))

def deleteMyLeague(session: Session, token: str, league_id: int):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        success = league_repository.deleteMyLeague(session, user_id, league_id)

        if not success:
            raise HTTPException(status_code=404, detail="League not found or unauthorized")

        return JSONResponse(content={"message": "Liga uspješno izbrisana"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def getLeagueById(session: Session, token: str, league_id: int) -> League:
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        league = league_repository.getLeagueById(session, league_id)

        if not league:
            raise HTTPException(status_code=404, detail="League not found or unauthorized")

        return league

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
