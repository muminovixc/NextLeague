from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    surname: str
    phone_number: str
    email: EmailStr
    profile_picture: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    profile_picture: Optional[str] = None

class UserRead(UserBase):
    id: int
    profile_picture: Optional[str] = None

    class Config:
        from_attributes = True
    
class UserChartBase(BaseModel):
    napad: int
    odbrana: int
    brzina: int
    snaga: int
    izdrzljivost: int
    dodavanja: int

class UserChartRead(UserChartBase):
    player_id: int
    sport: str

class UserChartUpdate(BaseModel):
    napad: Optional[int] = None
    odbrana: Optional[int] = None
    brzina: Optional[int] = None
    snaga: Optional[int] = None
    izdrzljivost: Optional[int] = None
    dodavanja: Optional[int] = None
