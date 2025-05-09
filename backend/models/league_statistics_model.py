from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class LeagueStatistic(SQLModel, table=True):
    __tablename__ = "league_statistic"
    
    league_id: int=Field(foreign_key="league.id") 
    moderator_user_id: int=Field(foreign_key="user.id") 
    team_id: int=Field(foreign_key="team.team_id") 
    team_statistic_id: int = Field(primary_key=True)