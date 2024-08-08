import Link from "next/link";
import React from "react";

/**
 * 네비게이션 메뉴를 렌더링하는 컴포넌트입니다.
 * 페이지 간의 링크를 제공하여 사용자가 애플리케이션 내에서 탐색할 수 있게 합니다.
 *
 * @returns {JSX.Element} 네비게이션 메뉴를 포함하는 JSX 요소입니다.
 *
 * @date 24.08.08
 */

const Menu: React.FC = () => {
  return (
    <nav id="menu">
      <ul id="menu-list">
        <li>
          <Link href="/content/Pick">예상번호 돌리기</Link>
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
};

export default Menu;
