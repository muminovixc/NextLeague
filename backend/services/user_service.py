from repositories import user_repository as UserRepository
from schemas.user_schema import UserUpdate
from sqlmodel import Session
from auth.jwt_utils import decode_access_token


def get_my_profile(db: Session, token: str):
    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        return UserRepository.get_user_by_id(db, user_id)
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")


def update_my_profile(db: Session, payload: UserUpdate, token: str):
    try:
        jwt_payload = decode_access_token(token)
        user_id = jwt_payload.get("id")
        if not user_id:
            raise Exception("User ID not found in token.")
        return UserRepository.update_user(db, user_id, payload)
    except Exception as e:
        raise Exception(f"Token error: {str(e)}")
