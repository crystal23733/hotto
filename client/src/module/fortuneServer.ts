/**
 * 운세 서버 연결
 */

const fortuneServerUrl = process.env.NEXT_PUBLIC_FORTUNE_SERVER_URL as string;

if (!fortuneServerUrl) {
  throw new Error("NEXT_PUBLIC_FORTUNE_SERVER_URL이 정의되지 않았습니다.");
}

export default fortuneServerUrl;
