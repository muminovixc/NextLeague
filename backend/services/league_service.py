from datetime import datetime, time, timedelta
import traceback
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session
from repositories import league_repository
from models.league_model import Calendar, League
from schemas.league_schema import AddTeamInLeague, TeamStatisticOut,LeagueCreate
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
        if "maximum league moderation limit" in str(e):
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
    
def addTeamInLeague(session, token: str, data: AddTeamInLeague):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")

        return league_repository.addTeamInLeague(session, data)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

def start_league(session: Session, token: str, league_id: int):
    payload = decode_access_token(token)
    user_id = payload.get("id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    league = league_repository.getLeagueById(session, league_id)
    if not league:
        raise HTTPException(status_code=404, detail="League not found")
    if league.moderator_user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # ✅ Provjera preko repository-ja
    if league_repository.calendar_exists_for_league(session, league_id):
        raise HTTPException(status_code=400, detail="Calendar has already been created for this league.")

    team_ids = league_repository.get_team_ids_in_league(session, league_id)
    if len(team_ids) < 2:
        raise HTTPException(status_code=400, detail="At least two teams are required to start a league")

    today = datetime.now().date()
    match_time = time(19, 0)  # 19:00 (7 PM)

    matches = []

    # Prvi krug (svako sa svakim bez revanša)
    for i in range(len(team_ids)):
        for j in range(i + 1, len(team_ids)):
            matches.append((team_ids[i], team_ids[j]))

    # Drugi krug (revanši)
    for i in range(len(team_ids)):
        for j in range(i + 1, len(team_ids)):
            matches.append((team_ids[j], team_ids[i]))

    for idx, (team1, team2) in enumerate(matches):
        match_date = datetime.combine(today + timedelta(days=idx), match_time)
        calendar_entry = Calendar(
            league_id=league_id,
            team_one_id=team1,
            team_two_id=team2,
            date=match_date,
            status="SCHEDULED",
            statistic_after_match_id=None
        )
        session.add(calendar_entry)

    session.commit()
    return {"message": "League started and calendar created."}

def getCalendarForLeague(session: Session, league_id: int):
    try:
        return league_repository.getCalendarForLeague(session, league_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def insert_statistics_after_match(session: Session, data: dict):
    try:
        return league_repository.insert_statistics_after_match(session, data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
