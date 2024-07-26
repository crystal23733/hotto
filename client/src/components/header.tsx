import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <div id="header">
      <h1>
        <Link href="/">hotto</Link>
      </h1>
      <div id="login-section">
        <Link href="/login">로그인</Link>
        <Link href="/join">회원가입</Link>
      </div>
    </div>
  );
};

export default Header;
