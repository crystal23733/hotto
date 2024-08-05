import logoutFetch from "client/src/api/logoutFetch";
import useAuth from "client/src/hook/useAuth";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logoutFetch();
    setIsAuthenticated(false);
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
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</a>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/join">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
