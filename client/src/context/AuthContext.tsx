import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import checkAuthStatue from "../api/auth/checkAuthStatue";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * 인증 상태를 가져오고 설정하는 훅입니다.
 * 이 훅은 `AuthProvider` 컴포넌트 내부에서만 사용할 수 있습니다.
 *
 * @returns {AuthContextProps} 인증 상태와 설정 함수를 포함하는 객체를 반환합니다.
 *
 * @throws {Error} `AuthProvider` 외부에서 사용하려고 할 때 오류를 발생시킵니다.
 *
 * @date 24.08.08
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

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const status = await checkAuthStatue();
        setIsAuthenticated(status.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
