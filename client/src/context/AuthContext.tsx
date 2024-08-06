import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import checkAuthStatue from "../api/lib/checkAuthStatue";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용되어야 합니다.");
  }
  return context;
};

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
        console.error("인증 상태 확인 중 오류 발생:", error);
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
