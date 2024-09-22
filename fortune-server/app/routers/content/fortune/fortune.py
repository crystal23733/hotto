"""
/fortune 엔드포인트에 관련된 처리 로직.

포춘텔링 결과를 제공하는 엔드포인트 설정.
"""

from fastapi import APIRouter, Request

router = APIRouter()


@router.post("/", status_code=201)
async def get_fortune(request:Request):
    """
    /fortune 기본 엔드포인트.

    Returns:
        JSON: 포춘텔링 결과 반환.
    """
    data = await request.json()
    print("응답 데이터:", data) #로그로 출력
    return {"fortune": "오늘은 좋은일이 생길 것 같습니다!"}
