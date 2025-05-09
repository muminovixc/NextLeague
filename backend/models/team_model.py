from sqlmodel import SQLModel, Field
from typing import Optional
from sqlmodel import Relationship

class Team(SQLModel, table=True):
    __tablename__ = "team"
    
    team_id: Optional[int] = Field(default=None, primary_key=True)
    moderator_user_id: int
    team_logo: Optional[str] = Field(default=None)
    team_sport: str = Field(max_length=100)  
    country: str = Field(max_length=100)
    team_identification: str = Field(max_length=255)  

