from sqlmodel import SQLModel, Field
from typing import Optional


class RequestLeague(SQLModel, table=True):
    __tablename__ = "request_league"

    id: Optional[int] = Field(default=None, primary_key=True)
    team_id: int = Field(foreign_key="team.team_id")
    league_id: int = Field(foreign_key="league.league_id")
    sender_id: int = Field(foreign_key="users.id")
    receiver_id: int = Field(foreign_key="users.id")
    
    is_reviewed: bool = Field(default=False)     # false dok moderator ne odluči
    is_accepted: Optional[bool] = Field(default=None)  
    # None dok nije odlučeno, True ako je prihvaćeno, False ako je odbijeno