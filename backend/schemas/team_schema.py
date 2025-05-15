from pydantic import BaseModel
from typing import Optional

class TeamBase(BaseModel):
    team_sport: str
    country: str
    team_identification: Optional[str]

class TeamCreate(TeamBase):
    team_logo: Optional[str]
    moderator_user_id: Optional[int]  # Dodaj ovo kako bi omogućio moderator_user_id


class TeamRead(TeamBase):
    team_id: int
    moderator_user_id: Optional[int]
    team_logo: Optional[str]

    class Config:
        orm_mode = True  # ovo je ORM objekt, pročitaj njegove atribute kao da su polja u dictionaryju.

class TeamUpdate(TeamBase):
    team_logo: Optional[str]