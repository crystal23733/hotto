"""
/fortune 엔드포인트에 관련된 처리 로직.

포춘텔링 결과를 제공하는 엔드포인트 설정.
"""

from fastapi import APIRouter, Request
from services.content.fortune_service import generate_fortune

router = APIRouter()


@router.post("/", status_code=201)
async def get_fortune(request: Request):
    """
    /fortune 기본 엔드포인트.

    Returns:
        JSON: 포춘텔링 결과 반환.
    """
    data = await request.json()
    user_input = data.get("text")
    print("요청 데이터:", data)  # 로그로 출력
    fortune = await generate_fortune(user_input)
    print("응답 데이터", fortune)
    return {"fortune": fortune}
