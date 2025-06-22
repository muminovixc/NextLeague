from sqlalchemy.orm import Session
from models.user_model import User
from models.league_model import League
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from models.team_model import Team
from schemas.homepage import PlayerSchema, TeamSchema, LeagueSchema

def get_user_by_id(session: Session, user_id: int) -> User | None:
    return session.query(User).filter(User.id == user_id).first()

def count_leagues_by_user(session: Session, user_id: int) -> int:
    return session.query(League).filter(League.moderator_user_id == user_id).count()

def count_teams_by_user(session: Session, user_id: int) -> int:
    return session.query(Team).filter(Team.moderator_user_id == user_id).count()

def get_leagues_by_user(db: Session, user_id: int):
    return db.query(League).filter(League.moderator_user_id == user_id).all()

def get_teams_by_user(db: Session, user_id: int):
    return db.query(Team).filter(Team.moderator_user_id == user_id).all()


async def search_all(session: AsyncSession, query: str):
    result = session.execute(
        select(User).where(User.name.ilike(f"%{query}%"))
    )
    players = result.scalars().all()

    result =  session.execute(
        select(Team).where(Team.name.ilike(f"%{query}%"))
    )
    teams = result.scalars().all()

    result =  session.execute(
        select(League).where(League.name.ilike(f"%{query}%"))
    )
    leagues = result.scalars().all()

    return {
        "players": players,
        "teams": teams,
        "leagues": leagues
    }