from fastapi import APIRouter, Request, HTTPException
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
    try:
        data = await request.json()
        user_input = data.get("text")
        session_id = request.cookies.get("session_id")
        user = get_user(session_id)
        if not user:
            raise HTTPException(status_code=401, detail="사용자를 찾을 수 없습니다.")
        check_token_limit(user)
        fortune = await generate_fortune(user_input)
        update_tokens(user["_id"])
        return {"fortune": fortune}
    except HTTPException as http_ex:
        return {"error": {"status": http_ex.status_code, "message": http_ex.detail}}
    except Exception as e:
        return {"error": {"status": 500, "message": str(e)}}
