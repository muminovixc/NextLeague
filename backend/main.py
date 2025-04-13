
from fastapi import FastAPI, Depends
from sqlmodel import Session, select
from backend.database.database import engine
from backend.models.models import User
from backend.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import APIRouter
from fastapi import Request

app = FastAPI()

# Dodavanje CORS middleware-a
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # samo za frontend koji je na ovom portu
    allow_credentials=True,
    allow_methods=["*"],  # dozvoljava sve HTTP metode, uključujući OPTIONS
    allow_headers=["*"],  # dozvoljava sva zaglavlja
)
# Dependency za kreiranje sesije
def get_session():
    with Session(engine) as session:
        yield session

# Ruta za dobavljanje svih korisnika
@app.get("/getUsers")
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users

@app.get("/user-data")
def get_user_data(request: Request):
    cookie = request.cookies.get("user_data")
    return {"user_data": cookie}

app.include_router(auth_router)