import os
from fastapi import HTTPException
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

# 실행 환경에 따라 적절한 .env 파일 로드
env = os.getenv("ENV", "development")  # 기본값은 "development"
if env == "production":
    load_dotenv(".env.production")
else:
    load_dotenv(".env.development")

# 환경변수에서 DB URL 가져오기
mongo_uri = os.getenv("DB_URL")
mongo_name = os.getenv("DB_NAME")

# MongoDB 클라이언트 설정
client = MongoClient(mongo_uri)
print(client)
db = client[mongo_name]
users_collection = db["users"]
print(users_collection)


def get_user(session_id: str):
    """
    세션 ID를 기반으로 사용자 정보를 가져오는 함수.
    Args:
        session_id (str): 세션 ID.
    Returns:
        dict: 사용자 정보.
    """
    print(users_collection)
    user = users_collection.find_one({"session_id": session_id})
    print(user)
    return user


def check_token_limit(user):
    """
    사용자의 토큰 사용량을 확인하고 제한을 초과하면 예외를 발생시키는 함수.
    Args:
        user (dict): 사용자 정보.
    Raises:
        HTTPException: 토큰 한도 초과 시 예외 발생.
    """
    current_date = datetime.now().date()
    if user["tokensUsedToday"] >= user["dailyTokenLimit"]:
        raise HTTPException(status_code=403, detail="토큰 한도를 초과했습니다.")


def update_tokens(user_id):
    """
    사용자 토큰 사용량을 업데이트하는 함수.
    Args:
        user_id (str): 사용자 ID.
    """
    users_collection.update_one(
        {"_id": ObjectId(user_id)}, {"$inc": {"tokenUsedToday": 1}}
    )


def reset_tokens(user_id: str):
    """
    사용자 토큰 사용량을 리셋하는 함수.
    Args:
        user_id (str): 사용자 ID.
    """
    users_collection.update_one(
        {"_id": ObjectId(user_id)}, {"$set": {"tokensUsedToday": 0}}
    )
