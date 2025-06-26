from datetime import datetime, timedelta
from fastapi import HTTPException
from sqlmodel import Session, extract, select
from models.request_model import RequestLeague
from models.team_model import Team, TeamStatistic
from models.league_model import Calendar, League, LeagueStatistic, LeagueTeam,LeagueTeamStatisticsView, ScoredPointInMatch, StatisticAfterMatch
from schemas.league_schema import AddTeamInLeague, LeagueCreate

def getMyLeagues(db: Session, user_id: int):
    # Filtriramo sve lige koje pripadaju korisniku sa user_id
    statement = select(League).where(League.moderator_user_id == user_id)
    results = db.exec(statement)
    return results.all()

def getAllLeagues(db: Session, limit: int, offset: int):
    statement = select(League).offset(offset).limit(limit)
    results = db.exec(statement)
    return results.all()

def getLeaguesStatistic(db: Session, league_id: int):
    statement = select(LeagueTeamStatisticsView).where(LeagueTeamStatisticsView.league_id == league_id)
    results = db.exec(statement)
    return results.all()

def createMyLeague(session: Session, user_id: int, data: LeagueCreate):
    new_league = League(
        moderator_user_id=user_id,
        name=data.name,
        sport=data.sport,
        number_of_teams=data.number_of_teams,
        number_of_players_in_team=data.number_of_players_in_team,
        country=data.country,
        access=data.access
    )
    session.add(new_league)
    session.commit()
    session.refresh(new_league)
    return new_league

def deleteMyLeague(session: Session, user_id: int, league_id: int) -> bool:
    league = session.get(League, league_id) #ovo staviti u service provjeru

    if not league or league.moderator_user_id != user_id:
        return False  

    session.delete(league)
    session.commit()
    return True
    
def getLeagueById(session: Session, league_id: int) -> League | None:
    statement = select(League).where(
        League.league_id == league_id,
    )
    result = session.exec(statement).first()
    return result

def get_leagues_for_user(db:Session, user_id: int):
    statement = select(League).where(League.moderator_user_id == user_id)
    results = db.exec(statement)
    return results.all()

def addTeamInLeague(session: Session, data: AddTeamInLeague):
    # 1. Dodaj u league_teams
    entry = LeagueTeam(
        league_id=data.league_id,
        team_id=data.team_id
    )
    session.add(entry)

    # (Radimo samo ažuriranje zato što kad se napravi Team automatski budu inicijalizirane sve vrijednosti na 0 osim league_id koji bude None)
    # 2. Ažuriraj league_id u team_statistic
    stat_stmt = select(TeamStatistic).where(TeamStatistic.team_id == data.team_id)
    stat_result = session.exec(stat_stmt).first()

    if not stat_result:
        raise HTTPException(status_code=404, detail="TeamStatistic not found")

    stat_result.league_id = data.league_id
    session.add(stat_result)

    # 3. Dodaj novi zapis u league_statistic
    league_stat_entry = LeagueStatistic(
        league_id=data.league_id,
        team_id=data.team_id,
        moderator_user_id=data.sender_id,
        team_statistic_id=stat_result.team_statistic_id
    )
    session.add(league_stat_entry)

    # 4. Ažuriraj odgovarajući zahtjev (RequestLeague)
    request_stmt = select(RequestLeague).where(RequestLeague.id == data.request_id)
    request_obj = session.exec(request_stmt).first()

    if not request_obj:
        raise HTTPException(status_code=404, detail="Request not found")

    request_obj.is_reviewed = True
    request_obj.is_accepted = True
    session.add(request_obj)

    session.commit()
    return {"message": "Team successfully added to league and statistics updated"}


def get_team_ids_in_league(session: Session, league_id: int) -> list[int]:
    stmt = select(LeagueTeam.team_id).where(LeagueTeam.league_id == league_id)
    results = session.exec(stmt).all()
    return [r for r in results]

def calendar_exists_for_league(session: Session, league_id: int) -> bool:
    result = session.exec(
        select(Calendar).where(Calendar.league_id == league_id)
    ).first()
    return result is not None

def getCalendarForLeague(session: Session, league_id: int):
    statement = select(Calendar).where(Calendar.league_id == league_id)
    results = session.exec(statement).all()

    calendar_with_data = []

    for match in results:
        team_one = session.get(Team, match.team_one_id)
        team_two = session.get(Team, match.team_two_id)

        match_data = {
            "id": match.id,
            "date": match.date,
            "status": match.status,
            "team_one": {
                "id": team_one.team_id,
                "name": team_one.name,
                "logo": team_one.team_logo,  
            },
            "team_two": {
                "id": team_two.team_id,
                "name": team_two.name,
                "logo": team_two.team_logo, 
            },
        }

        # Ako je utakmica odigrana i postoji statistika, dodaj i to
        if match.statistic_after_match_id:
            stat = session.get(StatisticAfterMatch, match.statistic_after_match_id)
            if stat:
                match_data["statistic"] = {
                    "winner_id": stat.winner_id,
                    "looser_id": stat.looser_id,
                    "win_points": stat.win_points,
                    "lose_points": stat.lose_points,
                    "best_player_id": stat.best_player_id,
                    "event_time": stat.event_time
                }

        calendar_with_data.append(match_data)

    return calendar_with_data


def insert_statistics_after_match(session: Session, data: dict):
    winner_id = data.get("winner_id")
    looser_id = data.get("looser_id")

    # Unos statistike utakmice
    statistic = StatisticAfterMatch(
        league_id=int(data["league_id"]),
        team_one_id=data["team_one_id"],
        team_two_id=data["team_two_id"],
        winner_id=winner_id if winner_id != 0 else None,
        looser_id=looser_id if looser_id != 0 else None,
        win_points=data.get("win_points"),
        lose_points=data.get("lose_points"),
        best_player_id=data.get("best_player_id")
    )
    session.add(statistic)
    session.commit()
    session.refresh(statistic)

    # Dodaj bodove po igračima
    scored_points = data.get("scored_points", [])
    for point in scored_points:
        scored = ScoredPointInMatch(
            statistic_after_match_id=statistic.id,
            player_id=point["player_id"],
            number_of_points=point["number_of_points"]
        )
        session.add(scored)

    # Ažuriranje team_statistic za oba tima
    def update_team_stat(team_id: int):
        stat = session.exec(
            select(TeamStatistic).where(
                TeamStatistic.team_id == team_id,
                TeamStatistic.league_id == int(data["league_id"])
            )
        ).first()

        if not stat:
            raise HTTPException(status_code=404, detail=f"TeamStatistic not found for team_id {team_id}")

        stat.number_of_matches_played += 1

        is_winner = (winner_id == team_id)
        is_loser = (looser_id == team_id)
        is_draw = winner_id in [0, None]

        if is_winner:
            stat.number_of_wins += 1
            stat.points += 3
        elif is_loser:
            stat.number_of_losses += 1
        elif is_draw:
            stat.number_of_draws += 1
            stat.points += 1

        # Golovi: pravična raspodjela
        if is_draw:
            scored = data.get("win_points") or 0
            conceded = data.get("win_points") or 0
        elif is_winner:
            scored = data.get("win_points") or 0
            conceded = data.get("lose_points") or 0
        elif is_loser:
            scored = data.get("lose_points") or 0
            conceded = data.get("win_points") or 0
        else:
            scored = 0
            conceded = 0

        stat.win_points += scored
        stat.lose_points += conceded
        stat.difference_points += (scored - conceded)

        session.add(stat)

    update_team_stat(data["team_one_id"])
    update_team_stat(data["team_two_id"])

    session.commit()
    return {"message": "Statistika, bodovi i timski podaci su uspješno dodani."}



