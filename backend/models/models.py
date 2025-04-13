from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date
#OVO SU TABELE U BAZI PODATAKA, SVAKA TABELA SE MORA OVAKO PREDSTAVITI

class User(SQLModel, table=True):
    __tablename__ = "USER"  # PostgreSQL prihvata i velika slova, ali bolje je koristiti mala i snake_case

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    surname: str
    birth_date: date  # koristi datetime.date, SQLModel će mapirati kao DATE u PostgreSQL
    email: str
    password: str
    phone_number: str

    
