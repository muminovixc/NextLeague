from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class PlayerStatistic(SQLModel, table=True):
    __tablename__ = "player_statistic"

    player_statistic_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")       
    team_id: int = Field(foreign_key="team.team_id")        
    league_id: int = Field(foreign_key="league.league_id")   
    scored_points: int
    matches_played: int
    number_of_mvp: int
    number_of_honore: int
