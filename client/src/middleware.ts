import { NextRequest, NextResponse } from "next/server";

// 로그인한 사용자만 접근 가능한 페이지 목록
const authRequiredPages = ["/Logout", "/Profile", "content/Pick"];

// 로그인하지 않은 사용자만 접근 가능한 페이지 목록
const guestOnlyPages = ["/Login", "/Join"];

/**
 * @date 24.08.11
 * 세션 상태에 따른 라우팅 접근 제한
 */
export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.has("LIN_HOTTO");
  if (isLoggedIn && guestOnlyPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isLoggedIn && authRequiredPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [authRequiredPages, guestOnlyPages],
};
