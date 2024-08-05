import { useEffect, useState } from "react"
import checkAuthStatue from "../api/lib/checkAuthStatue";

export default () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const status = await checkAuthStatue();
      console.log("Auth status:", status);
      setIsAuthenticated(status.isAuthenticated);
    };
    fetchAuthStatus();
  }, []);

  return { isAuthenticated, setIsAuthenticated };
};