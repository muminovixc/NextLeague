from sqlmodel import Session, select
from schemas.request_schema import RequestLeagueResponse
from models.league_model import League
from repositories import request_repository
from models.request_model import RequestLeague
from auth.jwt_utils import decode_access_token
from fastapi import HTTPException

def createRequestForLeague(session: Session, token: str, data: dict):
    try:
        payload = decode_access_token(token)
        sender_id = payload.get("id")
        if not sender_id:
            raise Exception("User ID not found in token.")

        # 1. Dobavi ligu
        league = session.exec(select(League).where(League.league_id == data["league_id"])).first()
        if not league:
            raise Exception("League not found.")

        receiver_id = league.moderator_user_id

        # 2. Koristi repository za provjeru duplikata
        existing = request_repository.getPendingRequest(
            session=session,
            team_id=data["team_id"],
            league_id=data["league_id"]
        )

        if existing:
            raise HTTPException(status_code=409, detail="Request already sent and awaiting review.")

        # 3. Ako je sve čisto, kreiraj novi zahtjev
        new_request = RequestLeague(
            team_id=data["team_id"],
            league_id=data["league_id"],
            sender_id=sender_id,
            receiver_id=receiver_id
        )

        return request_repository.createRequestForLeague(session, new_request)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

def getRequestsForLeague(session: Session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")

        raw_results = request_repository.getRequestsForLeagueRaw(session, user_id)

        response = []
        for request, team_name, league_name, sender_name, sender_surname in raw_results:
            response.append(RequestLeagueResponse(
                id=request.id,
                team_id=request.team_id,
                league_id=request.league_id,
                sender_id=request.sender_id,
                receiver_id=request.receiver_id,
                is_reviewed=request.is_reviewed,
                is_accepted=request.is_accepted,
                team_name=team_name,
                league_name=league_name,
                sender_full_name=f"{sender_name} {sender_surname}"
            ))

        return response

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
