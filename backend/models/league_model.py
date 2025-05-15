from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date
# SQLAlchemy Model


class League(SQLModel, table=True):
    __tablename__ = "league"

    league_id: Optional[int] = Field(default=None, primary_key=True)
    moderator_user_id : int =Field(foreign_key="user.id") 
    name: str = Field(max_length=100)
    sport: str = Field(max_length=100)
    number_of_teams: int
    number_of_players_in_team: int
    country: str = Field(max_length=100)
    access: str = Field(max_length=50)

class LeagueStatistic(SQLModel, table=True):
    __tablename__ = "league_statistic"

    league_id: int = Field(foreign_key="league.league_id", primary_key=True)
    moderator_user_id: int = Field(foreign_key="users.id")
    team_id: int = Field(foreign_key="team.team_id", primary_key=True)
    team_statistic_id: int = Field(foreign_key="team_statistic.team_statistic_id")

    # Optional: Relationships (ako želiš povezane objekte)
    # league: Optional["League"] = Relationship(back_populates="statistics")
    # team: Optional["Team"] = Relationship()
    # team_statistic: Optional["TeamStatistic"] = Relationship()

class LeagueTeamStatisticsView(SQLModel, table=True):
    __tablename__ = "league_team_statistics_view"  # mora da odgovara imenu VIEW-a u bazi

    league_id: int = Field(primary_key=True)
    team_id: int = Field(primary_key=True)
    team_name: str
    team_logo: str
    number_of_matches_played: int
    number_of_wins: int
    number_of_draws: int
    number_of_losses: int
    win_points: int
    lose_points: int
    difference_points: int
    points: int
