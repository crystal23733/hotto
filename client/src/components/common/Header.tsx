import checkAuthStatus from "client/src/api/auth/checkAuthStatus";
import logoutFetch from "client/src/api/auth/logoutFetch";
import { useAuth } from "client/src/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

/**
 * 24.08.08
 * @returns {JSX.Element} - 헤더 컴포넌트
 */
const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logoutFetch();
    const response = await checkAuthStatus();
    if (!response.isAuthenticated) {
      setIsAuthenticated(false);
      router.reload();
    }
  };

  if (isAuthenticated === null) {
    return <div>로딩중...</div>;
  }

  return (
    <div id="header">
      <h1>
        <Link href="/">hotto</Link>
      </h1>
      <div id="login-section">
        {isAuthenticated ? (
          <>
            <Link href="/mypage">마이페이지</Link>
            <a onClick={handleLogout} style={{ cursor: "pointer" }}>
              로그아웃
            </a>
          </>
        ) : (
          <>
            <Link href="/Login">로그인</Link>
            <Link href="/Join">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
