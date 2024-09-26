import os
from fastapi import HTTPException
from bson import ObjectId
from dotenv import load_dotenv
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler

# 환경변수 로드
load_dotenv()

# 실행 환경에 따라 적절한 .env 파일 로드
env = os.getenv("ENV", "development")  # 기본값은 "development"
if env == "production":
    load_dotenv(".env.production")
else:
    load_dotenv(".env.development")


def get_user(session_id: str):
    from main import users_collection

    """
    세션 ID를 기반으로 사용자 정보를 가져오는 함수.
    Args:
        session_id (str): 세션 ID.
    Returns:
        dict: 사용자 정보.
    """
    user = users_collection.find_one({"session_id": session_id})
    return user


def check_token_limit(user):
    """
    사용자의 토큰 사용량을 확인하고 제한을 초과하면 예외를 발생시키는 함수.
    Args:
        user (dict): 사용자 정보.
    Raises:
        HTTPException: 토큰 한도 초과 시 예외 발생.
    """
    if user["tokensUsedToday"] >= user["dailyTokenLimit"]:
        raise HTTPException(
            status_code=403, detail="오늘 가능한 질문 수를 초과하였습니다."
        )
    return


def update_tokens(user_id):
    from main import users_collection

    """
    사용자 토큰 사용량을 업데이트하는 함수.
    Args:
        user_id (str): 사용자 ID.
    """
    users_collection.update_one(
        {"_id": ObjectId(user_id)}, {"$inc": {"tokensUsedToday": 1}}
    )


def reset_tokens():
    from main import users_collection

    """
    사용자 토큰 사용량을 리셋하는 함수.
    Args:
        user_id (str): 사용자 ID.
    """
    current_date = datetime.now().date()
    print(f"{current_date} - 모든 사용자의 질문 횟수 리셋")
    users_collection.update_one({}, {"$set": {"tokensUsedToday": 0}})


# 스케쥴러 실행
scheduler = BackgroundScheduler(timezone="Asia/Seoul")

# 자정마다 실행되도록 작업 추가
scheduler.add_job(reset_tokens, "cron", hour=0, minute=0)

# 스케줄러 시작
scheduler.start()
