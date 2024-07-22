import Link from "next/link";
import React from "react";

const Menu: React.FC = () => {
  return (
    <nav id="menu">
      <ul id="menu-list">
        <li>
          <Link href="/content/pick">예상번호 돌리기</Link>
        </li>
        <li>
          <Link href="">회차별 당첨번호</Link>
        </li>
        <li>
          <Link href="">운세</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;