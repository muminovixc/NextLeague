from pydantic import BaseModel
from datetime import date

class UserResponse(BaseModel):
    id: int
    name: str
    surname: str
    birth_date: date
    email: str
    phone_number: str

    class Config:
        orm_mode = True
