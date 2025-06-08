from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.user_controller import router as user_router
from controllers.league_controller import router as league_router
from controllers.team_controller import router as team_router
from controllers.auth_controller import router as auth_router

app = FastAPI()



# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(league_router, prefix="/league", tags=["leagues"])
app.include_router(team_router, prefix="/team", tags=["teams"])
