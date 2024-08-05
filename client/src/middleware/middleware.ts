import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('connect.sid');
  const url = req.nextUrl.clone();

  // 세션이 있을 때 접근을 막아야 하는 페이지
  if (token && (url.pathname === '/login' || url.pathname === '/join')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 세션이 없을 때 접근을 막아야 하는 페이지
  if (!token && (url.pathname.startsWith('/protected') || url.pathname === '/mypage' || url.pathname === '/logout')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*', '/login', '/join', '/mypage', '/logout'],
};