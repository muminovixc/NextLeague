from sqlmodel import Session
from repositories import league_repository
from schemas.league_schema import TeamStatisticOut
from auth.jwt_utils import decode_access_token

def getMyLeagues(session: Session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        return league_repository.getMyLeagues(session, user_id)
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
    
def getAllLeagues(session: Session):
    #results = leagu_repository...
    return league_repository.getAllLeagues(session)

def getLeaguesStatistic(session: Session, league_id: int) -> list[TeamStatisticOut]:
    results = league_repository.getLeaguesStatistic(session, league_id)
    return [TeamStatisticOut.from_orm(row) for row in results]
