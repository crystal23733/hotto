import { useAuth } from "client/src/context/AuthContext";
import React from "react";

const MypageInfoContainer: React.FC = () => {
  const { userName, userEmail } = useAuth();
  return (
    <>
      <div>{userName}</div>
      <div>{userEmail}</div>
    </>
  );
};

export default MypageInfoContainer;
