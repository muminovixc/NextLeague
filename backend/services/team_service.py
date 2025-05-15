from repositories.team_repository import TeamRepository
from schemas.team_schema import TeamCreate, TeamUpdate
from sqlalchemy.orm import Session
from models.team_model import Team
from typing import List, Optional

class TeamService:

    @staticmethod
    def create_team(db: Session, team: TeamCreate) -> Team:
        return TeamRepository.create_team(db, team)

    @staticmethod
    def get_team_by_id(db: Session, team_id: int) -> Optional[Team]:
        return TeamRepository.get_team_by_id(db, team_id)

    @staticmethod
    def get_teams(db: Session, skip: int = 0, limit: int = 100) -> List[Team]:
        return TeamRepository.get_teams(db, skip, limit)

    @staticmethod
    def update_team(db: Session, team_id: int, team_update: TeamUpdate) -> Optional[Team]:
        return TeamRepository.update_team(db, team_id, team_update)

    @staticmethod
    def delete_team(db: Session, team_id: int) -> bool:
        return TeamRepository.delete_team(db, team_id)