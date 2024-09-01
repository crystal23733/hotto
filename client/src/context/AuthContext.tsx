import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import checkAuthStatus from "../api/auth/checkAuthStatus";

/**
 * 인증 상태와 사용자 정보를 포함하는 인터페이스
 *
 * @interface AuthContextProps
 * @property {boolean} isAuthenticated - 사용자의 인증 상태를 나타냅니다.
 * @property {function} setIsAuthenticated - 인증 상태를 업데이트하는 함수입니다.
 * @property {string | null} userName - 인증된 사용자의 이름입니다.
 * @property {function} setUserName - 사용자 이름을 업데이트하는 함수입니다.
 */
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userName: string | null;
  setUserName: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * useAuth 훅 - 인증 상태와 사용자 이름을 제공하는 커스텀 훅
 *
 * @returns {AuthContextProps} 인증 상태, 사용자 이름, 설정 함수를 포함하는 객체를 반환합니다.
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
 * @date 24.08.08
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const status = await checkAuthStatus();
        setIsAuthenticated(status.isAuthenticated);
        if (status.isAuthenticated && status.user?.name) {
          setUserName(status.user.name);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
