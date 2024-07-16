import React from "react";

const Header:React.FC = () => {
  return (
    <div id="header">
      <h1><a href="/">hotto</a></h1>
      <div id="login-section">
        <a href="/login">로그인</a>
        <a href="/join">회원가입</a>
      </div>      
    </div>
  )
}

export default Header;