/**
 * * 결제 서버 연결
 */

const payServer = process.env.NEXT_PUBLIC_PAY_SERVER_URL as string;

if (!payServer) {
  throw new Error("URL이 정의되지 않았습니다!");
}

export default payServer;
