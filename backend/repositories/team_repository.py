from sqlmodel import Session
from models.team_model import Team
from schemas.team_schema import TeamCreate, TeamUpdate
from typing import List, Optional

class TeamRepository:

    @staticmethod
    def create_team(db: Session, team: TeamCreate) -> Team:        
        db_team = Team(**team.dict())
        db.add(db_team)
        db.commit()
        db.refresh(db_team)
        return db_team

    @staticmethod
    def get_team_by_id(db: Session, team_id: int) -> Optional[Team]:
        return db.query(Team).filter(Team.team_id == team_id).first()

    @staticmethod
    def get_teams(db: Session, skip: int = 0, limit: int = 100) -> List[Team]:
        return db.query(Team).offset(skip).limit(limit).all()

    @staticmethod
    def update_team(db: Session, team_id: int, team_update: TeamUpdate) -> Optional[Team]:
        db_team = db.query(Team).filter(Team.team_id == team_id).first()
        if db_team:
            for key, value in team_update.dict(exclude_unset=True).items():
                setattr(db_team, key, value)
            db.commit()
            db.refresh(db_team)
            return db_team
        return None

    @staticmethod
    def delete_team(db: Session, team_id: int) -> bool:
        db_team = db.query(Team).filter(Team.team_id == team_id).first()
        if db_team:
            db.delete(db_team)
            db.commit()
            return True
        return False