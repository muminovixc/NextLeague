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