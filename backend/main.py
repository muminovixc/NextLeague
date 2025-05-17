
from fastapi import FastAPI, Depends
from sqlmodel import Session, select
from database.database import engine
from models.user_model import User
from controllers.auth_controller import router as auth_router
from controllers.league_controller import router as league_router
from controllers.team_controller import router as team_router
from controllers.homepage import router as homepage_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import APIRouter
from fastapi import Request
from controllers.vip_controller import router as vip_router

app = FastAPI()

# Dodavanje CORS middleware-a
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # samo za frontend koji je na ovom portu
    allow_credentials=True,
    allow_methods=["*"],  # dozvoljava sve HTTP metode, uključujući OPTIONS
    allow_headers=["*"],  # dozvoljava sva zaglavlja
)
print("FastAPI app se pokrenula")


app.include_router(auth_router)
app.include_router(league_router)
app.include_router(team_router)
app.include_router(homepage_router)
app.include_router(vip_router) 