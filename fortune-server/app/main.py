from fastapi import FastAPI
from routers.content import router as content_router  # content 패키지를 가져옵니다.

app = FastAPI()

# content 라우터 등록
app.include_router(content_router, prefix="/content", tags=["content"])

if __name__ == "__main__":
    """
    서버를 실행하는 진입점. Uvicorn으로 FastAPI 서버를 실행.

    실행 방법:
        - python app/main.py: 기본적으로 서버가 실행됨
    """
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
