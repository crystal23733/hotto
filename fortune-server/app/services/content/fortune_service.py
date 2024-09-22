import openai
from dotenv import load_dotenv
import os

# OpenAI API 키 설정
load_dotenv()
openai.api_key = os.getenv("AI_KEY")


async def generate_fortune(user_input: str) -> str:
    # 파인튜닝된 모델을 사용하여 운세 생성
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "너는 전문 점술가야. 사용자가 질문하는 사용자의 운세를 알려줘야해. 항상 긍정적일 수는 없으니까 부정적일 때도 있어야하고 사용자가 의심없게 애매하게 말할수도 있어야해. 그렇다고 너무 애매하게 해선 안돼!",
                },
                {"role": "user", "content": user_input},
            ],
            max_tokens=150,
        )
        fortune = response.choices[0].message
        return fortune
    except Exception as e:
        return f"운세를 응답하는중 오류가 발생하였습니다.{str(e)}"
