from pydantic import BaseModel
from datetime import date
from typing import Literal
from typing import List

class UserResponse(BaseModel):
    id: int
    name: str
    surname: str
    birth_date: date
    email: str
    phone_number: str

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
    team_logo: str
    team_identification: str

    class Config:
        from_attributes = True 


class PlayerSchema(BaseModel):
    id: int
    name: str

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
