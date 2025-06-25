from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, File, Form
from sqlmodel import Session
from database.database import engine, get_session
from services import user_service

def get_db():
    with Session(engine) as db:
        yield db

router = APIRouter(prefix="/user", tags=["users"])

@router.get("/my_profile")
def get_my_profile(request: Request, session: Session = Depends(get_db)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return user_service.get_my_profile(session, token)

@router.get("/{user_id}/profile")
def get_user_profile(user_id: int, session: Session = Depends(get_db)):
    return user_service.get_user_profile(session, user_id)

@router.put("/my_profile")
async def update_my_profile(
    request: Request,
    name: str = Form(...),
    surname: str = Form(...),
    phone_number: str = Form(...),
    email: str = Form(...),
    password: str = Form(None),
    profile_picture: UploadFile = File(None),
    sport: str = Form(...),
    napad: int = Form(0),
    odbrana: int = Form(0),
    brzina: int = Form(0),
    snaga: int = Form(0),
    izdrzljivost: int = Form(0),
    dodavanja: int = Form(0),
    session: Session = Depends(get_db)
):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return await user_service.update_my_profile(
        session, token, name, surname, phone_number, email, password,
        profile_picture, sport, napad, odbrana, brzina, snaga, izdrzljivost, dodavanja
    )

@router.get("/{user_id}/teams")
def get_user_teams(user_id: int, session: Session = Depends(get_session)):
    return user_service.get_teams_for_user(session, user_id)

@router.get("/{user_id}/leagues")
def get_user_leagues(user_id: int, session: Session = Depends(get_session)):
    return user_service.get_leagues_for_user(session, user_id)