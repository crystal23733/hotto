from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_fortune():
    return {"fortune" : "오늘은 좋은일이 생길 것 같습니다!"}