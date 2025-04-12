from fastapi import FastAPI
from auth import router  # Uvezi router iz auth.py
from database import engine, Base

# Kreiraj FastAPI aplikaciju
app = FastAPI()

# Poveži bazu podataka
Base.metadata.create_all(bind=engine)

# Dodaj router u aplikaciju
app.include_router(router)

