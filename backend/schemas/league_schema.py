from pydantic import BaseModel
from typing import Optional

class TeamStatisticOut(BaseModel):
    team_id: int
    team_name: Optional[str]
    team_logo: Optional[str]
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
        from_attributes = True
