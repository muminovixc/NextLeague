from pydantic import BaseModel
from datetime import date
from typing import Literal
from typing import Optional
from typing import List
from typing import Optional

class UserResponse(BaseModel):
    id: int
    name: str
    surname: str
    birth_date: date
    email: str
    phone_number: str
    user_type_id: int

    class Config:
        from_attributes = True


class UserCounts(BaseModel):
    leagues: int
    teams: int


class LeagueRead(BaseModel):
    league_id: int
    name: str
    sport: str
    number_of_teams: int
    access: str

    class Config:
        from_attributes = True



class TeamRead(BaseModel):
    team_id: int
    name: str
    team_sport: str
    moderator_user_id: int
    country: str
    team_logo: Optional[str] = None
    team_identification: str

    class Config:
        from_attributes = True 


class PlayerSchema(BaseModel):
    id: int
    name: str
    surname: str

class TeamSchema(BaseModel):
    id: int
    name: str

class LeagueSchema(BaseModel):
    id: int
    name: str

class SearchResult(BaseModel):
    players: List[PlayerSchema]
    teams: List[TeamSchema]
    leagues: List[LeagueSchema]
