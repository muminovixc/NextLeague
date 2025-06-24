from sqlmodel import select
from models.league_model import League
from repositories import request_repository
from models.request_model import RequestLeague
from auth.jwt_utils import decode_access_token
from fastapi import HTTPException

def createRequestForLeague(session, token: str, data: dict):
    try:
        payload = decode_access_token(token)
        sender_id = payload.get("id")
        if not sender_id:
            raise Exception("User ID not found in token.")

        # Dobavljanje lige kako bi izvukli moderatora
        league = session.exec(select(League).where(League.league_id == data["league_id"])).first()
        if not league:
            raise Exception("League not found.")

        receiver_id = league.moderator_user_id

        new_request = RequestLeague(
            team_id=data["team_id"],
            league_id=data["league_id"],
            sender_id=sender_id,
            receiver_id=receiver_id
        )

        return request_repository.createRequestForLeague(session, new_request)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

def getRequestsForLeague(session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")

        return request_repository.getRequestsForLeague(session, user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
