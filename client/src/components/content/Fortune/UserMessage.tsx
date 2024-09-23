import React from "react";

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="user-message">
      <div className="bubble">{message}</div> {/* 말풍선 스타일 적용 */}
    </div>
  );
};

export default UserMessage;
