import { NextRequest, NextResponse } from "next/server";
import FetchApi from "./api/lib/FetchApi";
import payServer from "./module/payServer";

export interface TIDValidationResponse {
  status: string; // 예: "valid" 또는 "invalid"
}

// 로그인한 사용자만 접근 가능한 페이지 목록
const authRequiredPages = [
  "/Logout",
  "/Profile",
  "/content/Pick",
  "/Mypage",
  "/content/Fortune",
];

// 로그인하지 않은 사용자만 접근 가능한 페이지 목록
const guestOnlyPages = ["/Login", "/Join"];

const paymentGateway = {
  kakaopay: {
    requiredPages: ["/kakaopay/success", "/kakaopay/fail", "/kakaopay/cancel"],
    requiredCookie: "tid",
    paymentInProgressCookie: "payment_in_progress",
  },
};

// 결제 관련 쿠키 정리 함수
const cleanupPaymentCookies = (req: NextRequest) => {
  console.log(req);
  const response = NextResponse.next();
  response.cookies.delete("tid");
  response.cookies.delete("payment_in_progress");
  return response;
};

/**
 * @date 24.08.11
 * 세션 상태에 따른 라우팅 접근 제한
 */
export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  // 로그인 유무에 따른 페이지 검증
  const isLoggedIn = req.cookies.has("LIN_HOTTO");
  if (isLoggedIn && guestOnlyPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isLoggedIn && authRequiredPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  // 결제 고유번호 유무에 따른 페이지 검증
  for (const [gateway, config] of Object.entries(paymentGateway)) {
    console.log(`Using gateway: ${gateway}`);
    const { requiredPages, requiredCookie, paymentInProgressCookie } = config;

    if (requiredPages.includes(pathname)) {
      const hasRequiredCookie = req.cookies.has(requiredCookie);
      const isPaymentInProgress = req.cookies.has(paymentInProgressCookie);

      // 결제 진행중이거나 필수 쿠키가 있는 경우에만 허용
      if (!hasRequiredCookie && !isPaymentInProgress) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // tid가 있는경우에만 유효성 검증
      if (hasRequiredCookie) {
        try {
          const tid = req.cookies.get(requiredCookie)?.value;
          const tidUrl = process.env.NEXT_PUBLIC_PAY_TID_ENDPOINT as string;
          const fetchApi = new FetchApi<TIDValidationResponse>(payServer);
          const response = await fetchApi.request(tidUrl, "POST", { tid });
          if (!response.status) {
            cleanupPaymentCookies(req);
            return NextResponse.redirect(new URL("/", req.url));
          }
        } catch (error) {
          cleanupPaymentCookies(req);
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    ...authRequiredPages,
    ...guestOnlyPages,
    ...Object.values(paymentGateway).flatMap(
      (gateway) => gateway.requiredPages,
    ),
  ],
};
