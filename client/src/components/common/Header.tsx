import checkAuthStatus from "client/src/api/auth/checkAuthStatus";
import logoutFetch from "client/src/api/auth/logoutFetch";
import { useAuth } from "client/src/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import MypageModal from "./MypageModal";
import useMyModal from "client/src/hook/Modal/useMyModal";
import usePayModal from "client/src/hook/Modal/usePayModal";
import PaymentModal from "./PaymentModal";

/**
 * 24.08.08
 * @returns {JSX.Element} - 헤더 컴포넌트
 */
const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, userName, userBalance } =
    useAuth();
  const { isActive, handleMypageModal, closeModal } = useMyModal();
  const { isPayActive, handlePaymentModal, closePayModal } = usePayModal();
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
            <PaymentModal isActive={isPayActive} closeModal={closePayModal} />
            <MypageModal isActive={isActive} closeModal={closeModal} />
            <span>{userName}님</span>
            <span>잔액: {userBalance}</span>
            <button onClick={handlePaymentModal} className="button is-link">
              금액 충전
            </button>
            <button onClick={handleMypageModal} className="button is-link">
              마이페이지
            </button>
            <a
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
              className="button is-link"
            >
              로그아웃
            </a>
          </>
        ) : (
          <>
            <Link href="/Login">로그인</Link>
            <Link href="/Join">회원가입</Link>{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default Header;
