from pydantic import BaseModel
from typing import Optional, Literal

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

class LeagueCreate(BaseModel):
    name: str
    sport: Literal["Football", "Basketball", "Volleyball", "Handball", "Gaming"]
    number_of_teams: int
    number_of_players_in_team: int
    country: str
    access: Literal["PUBLIC", "PRIVATE"]

class AddTeamInLeague(BaseModel):
    league_id: int
    team_id: int
    sender_id: int  # sada se koristi kao moderator_user_id za LeagueStatistic(to je moderator tima)
    request_id: int # za azuriranje polja is_reviewed i is_accepted

class StartLeagueRequest(BaseModel):
    league_id: int
