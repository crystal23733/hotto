/**
 * *서버 주소 연결
 */

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL as string;

if (!serverUrl) {
  throw new Error("NEXT_PUBLIC_SERVER_URL 환경 변수가 정의되지 않았습니다.");
}

export default serverUrl;