from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.user_controller import router as user_router
from controllers.league_controller import router as league_router
from controllers.team_controller import router as team_router
from controllers.auth_controller import router as auth_router
from controllers.homepage import router as homepage_router
from controllers import request_controller as request_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import APIRouter
from fastapi import Request
from controllers.vip_controller import router as vip_router
from fastapi.staticfiles import StaticFiles

from controllers.statistic_controller import router as statistics_router

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
app.mount("/images/team", StaticFiles(directory="images/team"), name="team_images")

# Include routers

  
 
app.include_router(auth_router)
app.include_router(league_router)  
app.include_router(team_router)  
app.include_router(homepage_router)
app.include_router(user_router)
app.include_router(vip_router)   
app.include_router(request_router.router)
app.include_router(statistics_router)