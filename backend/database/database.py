from sqlmodel import create_engine
from sqlalchemy.orm import sessionmaker


# Ispravan connection string (bez ?ssl=require)
postgresql_url = "postgresql://avnadmin:AVNS_6bBNmjONeM3B4D3MfDr@next-league-next-league.b.aivencloud.com:14290/defaultdb?sslmode=require"

# Dodaj connect_args da uključiš SSL
engine = create_engine(
    postgresql_url,
    echo=True,
    connect_args={"sslmode": "require"}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
def get_session():
    # Kreiraj novu sesiju
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()