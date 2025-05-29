from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List,ClassVar

class Team(SQLModel, table=True):
    __tablename__ = "team"

    team_id: int = Field(default=None, primary_key=True)
    moderator_user_id: Optional[int] = Field(foreign_key="users.id")
    team_logo: Optional[str]
    team_sport: str
    country: str
    team_identification: Optional[str] = Field(unique=True, index=True)
    name: str
    
class TeamStatistic(SQLModel, table=True):
    __tablename__ = "team_statistic"

    team_statistic_id: int = Field(default=None, primary_key=True)
    moderator_user_id: Optional[int] = Field(foreign_key="users.id")
    team_id: int = Field(foreign_key="team.team_id")
    league_id: int = Field(foreign_key="league.league_id")
    number_of_matches_played: int
    number_of_wins: int
    number_of_draws: int
    number_of_losses: int
    win_points: int
    lose_points: int
    difference_points: int
    points: int

class TeamStatisticView(SQLModel, table=True):
    __tablename__ = "team_statistic_view"  

    team_id: int = Field(primary_key=True)  
    team_logo: str
    team_sport: str
    country: str
    name: str
    number_of_matches_played: int
    number_of_wins: int
    number_of_draws: int
    number_of_losses: int
    win_points: int
    lose_points: int
    difference_points: int
    points: int
