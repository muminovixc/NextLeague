import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.database import get_session
from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.homepage import UserResponse
from schemas.homepage import UserCounts
from services import homepage as user_service
from services import homepage as homepage_service
from database.database import get_session 
from models.league_model import League
from models.user_model import User
from schemas.homepage import LeagueRead
from repositories.homepage import get_leagues_by_user
from services.homepage import fetch_user_leagues


router = APIRouter()

@router.get("/user-info", response_model=UserResponse)
def get_me(request: Request, session: Session = Depends(get_session)):
    # cookie = request.cookies.get("user_data" ) 
    user_data = request.cookies.get("user_data")
    if not user_data:
        raise HTTPException(status_code=401, detail="you are not logged in")

    try:
        # Parsi cookie da dobiješ user_id
       user_id = int(user_data.split("|")[0])
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user data format")

    # Koristi user_id da dohvatiš korisničke podatke iz baze
    user = user_service.get_logged_user(session, user_id)
    return user

@router.get("/user-counts", response_model=UserCounts)
def get_counts(request: Request, session: Session = Depends(get_session)):
    user_data = request.cookies.get("user_data")
    if not user_data:
        raise HTTPException(status_code=401, detail="Niste prijavljeni")

    user_id = int(user_data.split("|")[0])  # Ako je user_id prvi u cookie stringu
    return homepage_service.get_league_and_team_counts(session, user_id)


@router.get("/my-leagues", response_model=list[LeagueRead])
def get_my_leagues(
    request: Request,
    session: Session = Depends(get_session)
):
    user_data = request.cookies.get("user_data")
    user_id = int(user_data.split("|")[0]) 
    
    return fetch_user_leagues(session, user_id)