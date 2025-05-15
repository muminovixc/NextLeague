from fastapi import APIRouter, Response, HTTPException,Request,Body, Depends
from fastapi.responses import JSONResponse
from typing import Annotated,List
from sqlmodel import Session, select
from models.user_model import User
from database.database import engine
from hashlib import sha256
from schemas.auth_schema import LoginRequest,RegisterRequest
from services import user_service,auth_service
# SVA LOGIKA JE U SERVICE FOLDERU, ODAVDE POZIVAMO FUNKCIJU U SERVICE FOLDERU 
# A IZ SERVICE POZIVAMO DALJE STA NAM TREBA IZ REPOSITORES
# CONTROLLER <- SERVICE -> REPOSITORIES

# Dependency za kreiranje sesije
def get_session():
    with Session(engine) as session:
        yield session
SessionDep = Annotated[Session,Depends(get_session)]

router = APIRouter()

@router.post("/login")
def login_user(data: LoginRequest, response: Response, session: Session = Depends(get_session)):
    return auth_service.login_user(data, session, response)


@router.post("/register")
def register_user(data: RegisterRequest, session: Session = Depends(get_session)):
    return auth_service.register_user(data, session)
    
    # Ruta za dobavljanje svih korisnika
@router.get("/getUsers", response_model=List[User])
def get_users(session: Session = Depends(get_session)):
    return user_service.get_users(session)

@router.get("/user-data")
def get_user_data(request: Request):
    cookie = request.cookies.get("user_data")
    return {"user_data": cookie}