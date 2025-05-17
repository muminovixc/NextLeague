from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List,ClassVar

class TeamMembers(SQLModel, table=True):
    __tablename__ = "team_members"

    team_id: int = Field(foreign_key="team.team_id", primary_key=True)
    user_id: int = Field(foreign_key="users.id", primary_key=True)