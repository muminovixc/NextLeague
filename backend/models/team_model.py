from sqlmodel import SQLModel, Field
from typing import Optional
from sqlmodel import Relationship

class Team(SQLModel, table=True):
    team_id: Optional[int] = Field(default=None, primary_key=True)
    moderator_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    team_logo: Optional[str]
    team_sport: str
    country: str
    team_identification: Optional[str] = Field(unique=True, index=True)
