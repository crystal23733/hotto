import logoutFetch from "client/src/api/auth/logoutFetch";
import { useAuth } from "client/src/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MypageModal from "./modal/MypageModal";
import useMyModal from "client/src/hook/Modal/useMyModal";
import usePayModal from "client/src/hook/Modal/usePayModal";
import PaymentModal from "./PaymentModal";
import useSessionExpiredModal from "client/src/hook/common/modal/useSessionExpiredModal";
import SessionExpiredModal from "./modal/SessionExpiredModal";

/**
 * 24.08.08
 * @returns {JSX.Element} - 헤더 컴포넌트
 */
const Header: React.FC = () => {
  const { isAuthenticated, userName, userBalance } = useAuth();
  const { isActive, handleMypageModal, closeModal } = useMyModal();
  const { isPayActive, handlePaymentModal, closePayModal } = usePayModal();
  const { isSessionExpired, setIsSessionExpired } = useSessionExpiredModal();
  const [previousAuthState, setPreviousAuthState] = useState<boolean | null>(
    null,
  );
  const router = useRouter();

  const handleLogout = async () => {
    await logoutFetch();
    router.reload();
  };

  useEffect(() => {
    if (previousAuthState !== null && previousAuthState !== isAuthenticated) {
      // 이전 인증 상태와 현재 인증 상태를 비교
      if (!isAuthenticated) {
        setIsSessionExpired(true); // 세션이 만료되었다고 설정
      }
    }
    setPreviousAuthState(isAuthenticated);
  }, [isAuthenticated, previousAuthState]);

  const handleSessionExpiredConfirm = () => {
    setIsSessionExpired(false);
    window.location.reload(); // 확인 버튼을 누르면 페이지 새로고침
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
      <SessionExpiredModal
        isVisible={isSessionExpired}
        onConfirm={handleSessionExpiredConfirm}
      />
    </div>
  );
};

export default Header;
