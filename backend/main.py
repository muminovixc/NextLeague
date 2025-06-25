from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.user_controller import router as user_router
from controllers.league_controller import router as league_router
from controllers.team_controller import router as team_router
from controllers.auth_controller import router as auth_router
from controllers.homepage import router as homepage_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import APIRouter
from fastapi import Request
from controllers.vip_controller import router as vip_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()



# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("FastAPI app se pokrenula")

# Serve profile pictures statically
app.mount("/users/profile_pictures", StaticFiles(directory="users/profile_pictures"), name="profile_pictures")

# Include routers

app.include_router(auth_router)
app.include_router(league_router)  
app.include_router(team_router)  
app.include_router(homepage_router)
app.include_router(vip_router)   
app.include_router(user_router)