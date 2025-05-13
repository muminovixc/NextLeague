from pydantic import BaseModel
from datetime import date

class UserResponse(BaseModel):
    id: int
    name: str
    surname: str
    birth_date: date
    email: str
    phone_number: str

    class Config:
        orm_mode = True


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
        orm_mode = True
