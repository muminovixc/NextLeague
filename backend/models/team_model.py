from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Team(SQLModel, table=True):
    team_id: Optional[int] = Field(default=None, primary_key=True)
    moderator_user_id: Optional[int] = Field(foreign_key="users.id")
    team_logo: Optional[str]
    team_sport: str
    country: str
    name: str
    team_identification: Optional[str] = Field(unique=True, index=True)
