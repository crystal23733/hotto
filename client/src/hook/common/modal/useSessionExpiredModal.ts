import { useState } from "react";

export default () => {
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  const handleSessionExpired = () => {
    setIsSessionExpired(false);
    window.location.reload(); // 페이지 리로드
  };

  return { isSessionExpired, setIsSessionExpired, handleSessionExpired };
};
