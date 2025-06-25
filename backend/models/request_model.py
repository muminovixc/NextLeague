from sqlmodel import SQLModel, Field
from typing import Optional


class RequestLeague(SQLModel, table=True):
    __tablename__ = "request_league"

    id: Optional[int] = Field(default=None, primary_key=True)
    team_id: int = Field(foreign_key="team.team_id")
    league_id: int = Field(foreign_key="league.league_id")
    sender_id: int = Field(foreign_key="users.id")
    receiver_id: int = Field(foreign_key="users.id")
    
    is_reviewed: bool = Field(default=False)    
    is_accepted: Optional[bool] = Field(default=None)  


class RequestTeam(SQLModel, table=True):
    __tablename__ = "request_team"

    id: Optional[int] = Field(default=None, primary_key=True)
    sender_id: int = Field(foreign_key="users.id")
    receiver_id: int = Field(foreign_key="users.id")
    team_id: int = Field(foreign_key="team.team_id")
    is_reviewed: bool = Field(default=False)
    is_accepted: Optional[bool] = Field(default=None)



