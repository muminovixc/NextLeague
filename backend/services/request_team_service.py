from sqlmodel import Session, select
from models.team_model import Team
from models.request_model import RequestTeam
from auth.jwt_utils import decode_access_token
from repositories import request_repository
from fastapi import HTTPException

def create_request_for_team(session: Session, token: str, body: dict):
    try:
        user_data = decode_access_token(token)
        sender_id = user_data.get("id")

        team_id = body.get("team_id")
        if not team_id:
            raise ValueError("Missing team_id")

        team = session.get(Team, team_id)
        if not team:
            raise ValueError("Team not found")

        receiver_id = team.moderator_user_id
        if receiver_id is None:
            raise ValueError("Moderator not found for team")

        request = RequestTeam(
            sender_id=sender_id,
            receiver_id=receiver_id,
            team_id=team_id,
            is_reviewed=False,
            is_accepted=None
        )

        session.add(request)
        session.commit()
        session.refresh(request)
        return request

    except Exception as e:
        session.rollback()
        print("GREŠKA U create_request_for_team:", e)
        raise HTTPException(status_code=400, detail=str(e))



def get_requests_for_team(session: Session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        return request_repository.getRequestsForTeam(session, user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
