from fastapi import APIRouter
from .fortune import router as fortune_router

router = APIRouter()

router.include_router(fortune_router, prefix="/fortune", tags=["fortune"])