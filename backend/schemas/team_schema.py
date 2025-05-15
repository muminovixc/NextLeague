from pydantic import BaseModel
from typing import Optional, List

class TeamCreate(BaseModel):
    moderator_user_id: Optional[int]
    team_logo: Optional[str]
    team_sport: str
    country: str
    team_identification: Optional[str]


class TeamRead(BaseModel):
    team_id: int
    moderator_user_id: Optional[int]
    team_logo: Optional[str]
    team_sport: str
    country: str
    team_identification: Optional[str]

    class Config:
        orm_mode = True

#ovde da bude kada sa frontenda posalje zahtjev
# da se pridruzi timu
class JoinTeamRequest(BaseModel):
    team_id : int
    join_code: str