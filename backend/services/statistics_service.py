from sqlalchemy.orm import Session
from models.team_members_models import TeamMembers
from models.user_model import User
from schemas.statistics_schema import TeamPlayersResponse, PlayerInfo
from fastapi import HTTPException
from models.team_model import TeamStatistic
from schemas.statistics_schema import TeamStatResponse

def get_team_players_info_service(db: Session, team_id: int) -> TeamPlayersResponse:
    team_members = (
        db.query(TeamMembers, User)
        .join(User, TeamMembers.user_id == User.id)
        .filter(TeamMembers.team_id == team_id)
        .all()
    )

    if not team_members:
        raise HTTPException(status_code=404, detail="No players found for this team.")

    players = []
    for tm, user in team_members:
        players.append(PlayerInfo(
            id=user.id,
            name=user.name,
            surname=user.surname,
            email=user.email,
        ))

    return TeamPlayersResponse(
        team_id=team_id,
        number_of_players=len(players),
        players=players
    )




def get_team_statistic_service(db: Session, team_id: int) -> TeamStatResponse:
    stat = db.query(TeamStatistic).filter(TeamStatistic.team_id == team_id).all()[-1]
    if not stat:
        raise HTTPException(status_code=404, detail="No statistics found for this team.")

    return stat
