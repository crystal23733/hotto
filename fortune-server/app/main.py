import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.content import router as content_router  # content 패키지를 가져옵니다.
from dotenv import load_dotenv

load_dotenv()  # dotenv

app = FastAPI()

# CORS설정
origin = os.getenv("CLIENT_URL")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World!"}


# content 라우터 등록
app.include_router(content_router, prefix="/content", tags=["content"])

if __name__ == "__main__":
    """
    서버를 실행하는 진입점. Uvicorn으로 FastAPI 서버를 실행.

    실행 방법:
        - python app/main.py: 기본적으로 서버가 실행됨
    """
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="127.0.0.1", port=port)
