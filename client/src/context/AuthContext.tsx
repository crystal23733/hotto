import useSWR from "swr";
import { createContext, ReactNode, useContext } from "react";
import checkAuthStatus from "../api/auth/checkAuthStatus";

/**
 * 인증 상태와 사용자 정보를 포함하는 인터페이스
 *
 * @interface AuthContextProps
 * @property {boolean} isAuthenticated - 사용자의 인증 상태를 나타냅니다.
 * @property {string | null} userName - 인증된 사용자의 이름입니다.
 * @property {string | null} userEmail - 인증된 사용자의 이메일입니다.
 * @property {number} userBalance - 인증된 사용자의 잔액입니다.
 */
interface AuthContextProps {
  isAuthenticated: boolean;
  userName: string | null;
  userEmail: string | null;
  userBalance: number;
}

// 인증 상태를 관리하는 컨텍스트 생성
const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * 인증 상태와 사용자 정보를 제공하는 커스텀 훅
 *
 * @returns {AuthContextProps} 인증 상태와 사용자 정보를 포함하는 객체를 반환합니다.
 * @throws {Error} 이 훅은 반드시 AuthProvider 내부에서 사용해야 합니다.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용되어야 합니다.");
  }
  return context;
};

/**
 * 인증 상태를 관리하는 컨텍스트 제공자 컴포넌트입니다.
 * `AuthProvider`는 인증 상태를 가져오고 이를 하위 컴포넌트에 제공합니다.
 *
 * @param {ReactNode} children - `AuthProvider`의 자식 요소입니다.
 *
 * @returns {JSX.Element} `AuthContext.Provider`를 포함하는 JSX 요소를 반환합니다.
 *
 * @date 24.10.24
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  /**
   * 사용자 인증 정보를 가져오는 함수입니다.
   *
   * @returns {Promise<{ isAuthenticated: boolean, userName: string | null, userEmail: string | null, userBalance: number }>} 사용자 인증 정보
   */
  const fetcher = async () => {
    const status = await checkAuthStatus();
    return {
      isAuthenticated: status.isAuthenticated,
      userName: status.user?.name || null,
      userEmail: status.user?.email || null,
      userBalance: status.user?.balance || 0,
    };
  };

  // SWR을 사용하여 인증 상태를 10초마다 새로고침합니다.
  const { data, error } = useSWR("/auth-status", fetcher, {
    refreshInterval: 3600000,
  });

  // 기본 데이터 설정
  const value: AuthContextProps = {
    isAuthenticated: data?.isAuthenticated || false,
    userName: data?.userName || null,
    userEmail: data?.userEmail || null,
    userBalance: data?.userBalance || 0,
  };

  // 데이터 로딩 중일 경우 로딩 UI 반환
  if (!data && !error) {
    return <div>로딩중...</div>;
  }

  // 인증 상태와 사용자 정보를 Context에 제공
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
