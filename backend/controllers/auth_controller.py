from fastapi import APIRouter, Response, HTTPException,Request,Body, Depends
from fastapi.responses import JSONResponse
from typing import Annotated,List
from sqlmodel import Session, select
from models.user_model import User
from database.database import engine
from hashlib import sha256
from schemas.auth_schema import LoginRequest,RegisterRequest
from services import user_service,auth_service
from auth.jwt_utils import decode_access_token  # tvoje JWT dekodiranje
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# SVA LOGIKA JE U SERVICE FOLDERU, ODAVDE POZIVAMO FUNKCIJU U SERVICE FOLDERU 
# A IZ SERVICE POZIVAMO DALJE STA NAM TREBA IZ REPOSITORES
# CONTROLLER <- SERVICE -> REPOSITORIES

security = HTTPBearer()

# Dependency za kreiranje sesije
def get_session():
    with Session(engine) as session:
        yield session
SessionDep = Annotated[Session,Depends(get_session)];

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
    # Dobijanje tokena iz kolačića (pretpostavljamo da se zove 'user_data')
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Missing or invalid cookie")

    try:
        # Dekodiranje tokena
        payload = decode_access_token(token)
        return {"user_data": payload}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")