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
from jose import JWTError, jwt
from models.user_model import User
from schemas.homepage import LeagueRead
from schemas.homepage import TeamRead
from repositories.homepage import get_leagues_by_user
from auth.jwt_utils import decode_access_token
from services.homepage import fetch_user_leagues
from services.homepage import fetch_user_teams
import uvicorn
import stripe
from dotenv import load_dotenv
load_dotenv() 


 


router = APIRouter()
api_key = os.environ.get("STRIPE_SECRET_KEY")
print(api_key)
stripe.api_key = api_key

@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    data = await request.json()

    checkout_session = stripe.checkout.Session.create(
        success_url="http://localhost:3000/vip/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost:3000/homepage",
        payment_method_types=["card"],
        mode="subscription",

        line_items=[{
            "price": data["priceId"], 
            "quantity": 1
        }]
    )

    return {"sessionId": checkout_session["id"]}
