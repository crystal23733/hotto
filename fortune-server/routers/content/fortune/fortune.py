from fastapi import APIRouter, Request, Depends, HTTPException
from services.content.fortune_service import generate_fortune
from services.content.token_management import get_user, check_token_limit, update_tokens

router = APIRouter()


@router.post("/", status_code=201)
async def get_fortune(request: Request):
    """
    /fortune 기본 엔드포인트.

    Args:
        request (Request): 요청 객체.

    Returns:
        JSON: 포춘텔링 결과 반환.
    """
    data = await request.json()
    user_input = data.get("text")
    session_id = request.cookies.get("session_id")
    user = get_user(session_id)
    if not user:
        raise HTTPException(status_code=401, detail="사용자를 찾을 수 없습니다.")
    check_token_limit(user)
    print("요청 데이터:", data)  # 로그로 출력
    fortune = await generate_fortune(user_input)
    print("응답 데이터", fortune)
    update_tokens(user["_id"])
    print("사용자 정보:", user)
    return {"fortune": fortune}
