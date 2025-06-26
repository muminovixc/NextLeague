from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime
# SQLAlchemy Model


class League(SQLModel, table=True):
    __tablename__ = "league"

    league_id: Optional[int] = Field(default=None, primary_key=True)
    moderator_user_id : int =Field(foreign_key="users.id") 
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

class LeagueTeam(SQLModel, table=True):
    __tablename__ = "league_teams"

    league_id: int = Field(foreign_key="league.league_id", primary_key=True)
    team_id: int = Field(foreign_key="team.team_id", primary_key=True)

class StatisticAfterMatch(SQLModel, table=True):
    __tablename__ = "statistic_after_match"

    id: Optional[int] = Field(default=None, primary_key=True)
    
    league_id: int = Field(foreign_key="league.league_id")
    team_one_id: int = Field(foreign_key="team.team_id")
    team_two_id: int = Field(foreign_key="team.team_id")
    
    winner_id: Optional[int] = Field(default=None, foreign_key="team.team_id")
    looser_id: Optional[int] = Field(default=None, foreign_key="team.team_id")
    
    win_points: Optional[int] = None
    lose_points: Optional[int] = None
    
    best_player_id: Optional[int] = Field(default=None, foreign_key="users.id")
    
    event_time: datetime = Field(default_factory=datetime.utcnow)

class ScoredPointInMatch(SQLModel, table=True):
    __tablename__ = "scored_point_in_match"

    scored_point_in_match_id: Optional[int] = Field(default=None, primary_key=True)
    statistic_after_match_id: int = Field(foreign_key="statistic_after_match.id")
    player_id: int = Field(foreign_key="users.id")
    number_of_points: int

class Calendar(SQLModel, table=True):
    __tablename_ = "calendar"

    id: Optional[int] = Field(default=None, primary_key=True)
    league_id: int = Field(foreign_key="league.league_id")
    team_one_id: int = Field(foreign_key="team.team_id")
    team_two_id: int = Field(foreign_key="team.team_id")
    date: datetime
    statistic_after_match_id: Optional[int] = Field(default=None, foreign_key="statistic_after_match.id")
    status: str = Field(default="SCHEDULED")

