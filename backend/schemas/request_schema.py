from typing import Optional
from pydantic import BaseModel

class RequestLeagueResponse(BaseModel):
    id: int
    team_id: int
    league_id: int
    sender_id: int
    receiver_id: int
    is_reviewed: bool
    is_accepted: Optional[bool]

    team_name: str
    league_name: str
    sender_full_name: str
