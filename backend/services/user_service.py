from repositories import user_repository as UserRepository
from schemas.user_schema import UserUpdate
from sqlmodel import Session
from auth.jwt_utils import decode_access_token
from models.user_model import UserChart
from sqlmodel import select
from repositories.team_repository import get_teams_for_user as repo_get_teams_for_user
from repositories.league_repository import get_leagues_for_user as repo_get_leagues_for_user
import os, shutil


def get_my_profile(db: Session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        
        # Dohvati user podatke
        user = UserRepository.get_user_by_id(db, user_id)
        
        # Dohvati chart podatke za korisnika
        chart_query = select(UserChart).where(UserChart.player_id == user_id)
        charts = db.exec(chart_query).all()
        
        # Konvertuj u dictionary format
        user_dict = {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "phone_number": user.phone_number,
            "email": user.email,
            "user_type_id": user.user_type_id,
            "profile_picture": user.profile_picture,
            "sport": "fudbal",
            "charts": charts
        }
        
        return user_dict
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")

def get_user_profile(db: Session, user_id: int):
    try:
        # Dohvati user podatke
        user = UserRepository.get_user_by_id(db, user_id)
        
        if not user:
            raise Exception("User not found.")
        
        # Dohvati chart podatke za korisnika
        chart_query = select(UserChart).where(UserChart.player_id == user_id)
        charts = db.exec(chart_query).all()
        
        # Konvertuj u dictionary format
        user_dict = {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "phone_number": user.phone_number,
            "email": user.email,
            "user_type_id": user.user_type_id,
            "profile_picture": user.profile_picture,
            "sport": "fudbal",
            "charts": charts
        }
        
        return user_dict
    except Exception as e:
        raise Exception(f"Error fetching user profile: {str(e)}")

async def update_my_profile(
    db, token, name, surname, phone_number, email, password,
    profile_picture, sport, napad, odbrana, brzina, snaga, izdrzljivost, dodavanja
):
    from auth.jwt_utils import decode_access_token
    from sqlalchemy import and_
    user_id = decode_access_token(token).get("id")
    if not user_id:
        raise Exception("User ID not found in token.")

    # Slika
    picture_path = None
    if profile_picture:
        folder = "users/profile_pictures"
        os.makedirs(folder, exist_ok=True)
        ext = os.path.splitext(profile_picture.filename)[-1]
        filename = f"{token[:16]}{ext}"
        file_path = os.path.join(folder, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(profile_picture.file, buffer)
        picture_path = file_path.replace("\\", "/")

    # Pripremi podatke za update
    update_data = {
        "name": name.strip() if name else "",
        "surname": surname.strip() if surname else "",
        "phone_number": phone_number.strip() if phone_number else "",
        "email": email.strip() if email else "",
        "password": password if password else None,
    }
    if picture_path:
        update_data["profile_picture"] = picture_path

    user_data = UserUpdate(**update_data)
    UserRepository.update_user(db, user_id, user_data)

    # Chart update/insert
    existing_chart = db.exec(
        select(UserChart).where(
            and_(
                UserChart.player_id == user_id,
                UserChart.sport == sport
            )
        )
    ).first()
    chart_data = {
        "napad": napad or 0,
        "odbrana": odbrana or 0,
        "brzina": brzina or 0,
        "snaga": snaga or 0,
        "izdrzljivost": izdrzljivost or 0,
        "dodavanja": dodavanja or 0,
        "sport": sport or "fudbal"
    }
    if existing_chart:
        for key, value in chart_data.items():
            if key != "sport":
                setattr(existing_chart, key, value)
    else:
        new_chart = UserChart(player_id=user_id, **chart_data)
        db.add(new_chart)
    db.commit()

    # Vrati ažuriran profil
    return get_my_profile(db, token)

def get_teams_for_user(session:Session, user_id: int):
    teams = repo_get_teams_for_user(session, user_id)
    print("DEBUG TEAMS:", teams)
    return [team.dict() if hasattr(team, 'dict') else (team[0].dict() if team and hasattr(team[0], 'dict') else None) for team in teams]

def get_leagues_for_user(session:Session, user_id: int):
    leagues = repo_get_leagues_for_user(session, user_id)
    print("DEBUG LEAGUES:", leagues)
    return [league.dict() if hasattr(league, 'dict') else (league[0].dict() if league and hasattr(league[0], 'dict') else None) for league in leagues]
