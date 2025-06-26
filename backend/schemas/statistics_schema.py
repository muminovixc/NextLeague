from pydantic import BaseModel
from datetime import date
from typing import List

class PlayerInfo(BaseModel):
    id: int
    name: str
    surname: str
    email: str

class TeamPlayersResponse(BaseModel):
    team_id: int
    number_of_players: int
    players: List[PlayerInfo]


class TeamStatResponse(BaseModel):
    team_id: int
    league_id: int
    number_of_matches_played: int
    number_of_wins: int
    number_of_draws: int
    number_of_losses: int
    win_points: int
    lose_points: int
    difference_points: int
    points: int

    class Config:
        orm_mode = True
