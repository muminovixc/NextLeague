import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.database import get_session
from fastapi import APIRouter, Request, Depends, HTTPException
from schemas.homepage import UserResponse
from schemas.homepage import UserCounts
from fastapi.responses import JSONResponse
from services import homepage as user_service
from sqlmodel import Session, select
from services import homepage as homepage_service
from database.database import get_session 
from models.league_model import League
from models.team_model import Team
from schemas.homepage import PlayerSchema, TeamSchema, LeagueSchema
from jose import JWTError, jwt
from models.user_model import User
from schemas.homepage import LeagueRead
from schemas.homepage import TeamRead
from repositories.homepage import get_leagues_by_user
from auth.jwt_utils import decode_access_token
from services.homepage import fetch_user_leagues
from services.homepage import fetch_user_teams
from fastapi import APIRouter, Depends, Query
from typing import List
from schemas.homepage import SearchResult
from services.homepage import perform_search
from sqlmodel.ext.asyncio.session import AsyncSession


router = APIRouter()

@router.get("/user-info", response_model=UserResponse)
def get_me(request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    payload = decode_access_token(token)
    user_id_str = payload.get("id")
    user_id = int(user_id_str)
    user = user_service.get_logged_user(session, user_id)
    return user

@router.get("/user-counts", response_model=UserCounts)
def get_counts(request: Request, session: Session = Depends(get_session)):
    token = request.cookies.get("access_token")
    payload = decode_access_token(token)
    user_id_str = payload.get("id")
    user_id = int(user_id_str)
    return homepage_service.get_league_and_team_counts(session, user_id)


@router.get("/my-leagues", response_model=list[LeagueRead])
def get_my_leagues(
    request: Request,
    session: Session = Depends(get_session)
):
    token = request.cookies.get("access_token")
    payload = decode_access_token(token)
    user_id_str = payload.get("id")
    user_id = int(user_id_str)
    return fetch_user_leagues(session, user_id)

@router.get("/my-teams-moderator", response_model=list[TeamRead])
def get_my_teams(
    request: Request,
    session: Session = Depends(get_session)
):
    token = request.cookies.get("access_token")
    payload = decode_access_token(token)
    user_id_str = payload.get("id")
    user_id = int(user_id_str)
    return fetch_user_teams(session, user_id)




@router.get("/search", response_model=SearchResult)
def search(query: str, session: Session = Depends(get_session)):
    try:
        players_query = session.execute(select(User).where(User.name.contains(query)))
        teams_query = session.execute(select(Team).where(Team.name.contains(query)))
        leagues_query = session.execute(select(League).where(League.name.contains(query)))

        players = players_query.scalars().all()
        teams = teams_query.scalars().all()
        leagues = leagues_query.scalars().all()

        return {
            "players": [PlayerSchema(id=p.id, name=p.name) for p in players],
            "teams": [TeamSchema(id=t.team_id, name=t.name) for t in teams],
            "leagues": [LeagueSchema(id=l.league_id, name=l.name, sport=l.sport, access=l.access) for l in leagues]
        }
    except Exception as e:
        print(f"Error during search: {e}", file=sys.stderr)
        return JSONResponse(status_code=500, content={"error": str(e)})