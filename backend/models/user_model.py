from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
#OVO SU TABELE U BAZI PODATAKA, SVAKA TABELA SE MORA OVAKO PREDSTAVITI

class User(SQLModel, table=True):
    __tablename__ = "users"  # PostgreSQL prihvata i velika slova, ali bolje je koristiti mala i snake_case

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    surname: str
    phone_number: str
    email: str
    password: str
    user_type_id: Optional[int] = Field(default=1)
    profile_picture: Optional[str] = None

class UserChart(SQLModel, table = True):
    __tablename__ = "user_chart"
    id: Optional[int] = Field(default=None, primary_key=True)
    player_id: Optional[int] = Field(foreign_key="users.id")
    napad: int
    odbrana: int
    brzina: int
    snaga: int
    izdrzljivost: int
    dodavanja: int
    sport: str
