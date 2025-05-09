import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.database import get_session
from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.homepage import UserResponse
from services import homepage as user_service
from database.database import get_session  # Pretpostavljam da ovo već postoji u tvom kodu

router = APIRouter()

@router.get("/user-info", response_model=UserResponse)
def get_me(request: Request, session: Session = Depends(get_session)):
    # Dohvati cookie sa podacima korisnika
    user_data = request.cookies.get("user_data")
    if not user_data:
        raise HTTPException(status_code=401, detail="Niste prijavljeni")

    try:
        # Parsiraj user_id iz cookie-ja
       user_id = int(user_data.split("|")[0])
    except ValueError:
        raise HTTPException(status_code=400, detail="Neispravan format cookieja")

    # Koristi user_id da dohvatiš korisničke podatke iz baze
    user = user_service.get_logged_user(session, user_id)
    return user
