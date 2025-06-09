from pydantic import BaseModel
from typing import Optional

class TeamReadOnly(BaseModel):
    team_id: int
    team_name: str
    team_logo: Optional[str] = None
    club_id: int
    league_id: int
    moderator_user_id: int

    class Config:
        from_attributes = True

class TeamBase(BaseModel):
    team_name: str
    team_logo: Optional[str] = None
    club_id: int
    league_id: int
    moderator_user_id: int


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    team_name: Optional[str] = None
    team_logo: Optional[str] = None
    club_id: Optional[int] = None
    league_id: Optional[int] = None
    moderator_user_id: Optional[int] = None


class TeamOut(TeamBase):
    team_id: int

    class Config:
        from_attributes = True


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


class TeamMemberSchema(BaseModel):
    id: int
    name: str
    surname: str

    class Config:
        from_attributes = True

class DeleteTeam(BaseModel):
    team_id: int

    class Config:
        from_attributes = True