from pydantic import BaseModel,EmailStr
from datetime import date


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
    surname: str
    birth_date: date  # Format: "YYYY-MM-DD"
    email: EmailStr
    password: str
    phone_number: str