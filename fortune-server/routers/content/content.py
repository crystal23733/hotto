"""
content 관련 라우터 설정 파일.

여러 하위 라우터(fortune 등)를 포함.
"""

from fastapi import APIRouter
from .fortune import router as fortune_router

router = APIRouter()

router.include_router(fortune_router, prefix="/fortune", tags=["fortune"])
