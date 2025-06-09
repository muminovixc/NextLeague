import stripe
import os
from sqlmodel import Session
from fastapi import HTTPException
from auth.jwt_utils import decode_access_token
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.vip_repository import update_user_type
from dotenv import load_dotenv
from fastapi import APIRouter, Request, Depends, HTTPException

load_dotenv()

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


def handle_confirm_purchase(request: Request,session: Session, session_id: str):

    try:
        # Dohvatanje checkout sesije s ekspandiranim line_items
        checkout_session = stripe.checkout.Session.retrieve(
            session_id,
            expand=["line_items.data.price"]
        )

        print("Checkout session:", checkout_session)

        metadata = checkout_session.get("metadata", {})
        token = request.cookies.get("access_token")
        payload = decode_access_token(token)
        user_id_str = payload.get("id")
        user_id = int(user_id_str)

        line_items = checkout_session.get("line_items", {}).get("data", [])

        if not line_items:
            print("No line items found in the Stripe session.")
            raise HTTPException(status_code=400, detail="No line items found in the Stripe session.")

        price_id = line_items[0]["price"]["id"]

        print("User ID iz Stripe-a:", user_id)
        print("Price ID:", price_id)

        # Primer: razlikujemo pakete po price_id.
        if price_id == "price_1RPq6YQbnCtu5rm4fQEj3Unx":  
            user_type = 2
        elif price_id == "price_1RPqGOQbnCtu5rm4KrVrLTjM":  
            user_type = 3
        else:
            user_type = 1 

        update_user_type(session, user_id, user_type)

    except stripe.error.StripeError as e:
        print(">>> GREŠKA:", str(e))  # ✅ Debug ispis
        raise HTTPException(status_code=500, detail=f"Stripe error: {str(e)}")
    except Exception as e:
        print(">>> GREŠKA:", str(e))  # ✅ Debug ispis
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
