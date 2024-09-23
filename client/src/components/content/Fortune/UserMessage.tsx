import React from "react";

/**
 * UserMessageProps 인터페이스
 *
 * @interface
 * @property {string} message 유저가 입력한 메시지
 */
interface UserMessageProps {
  message: string;
}

/**
 * 유저 메시지를 표시하는 컴포넌트
 *
 * @component
 * @param {UserMessageProps} props 컴포넌트 속성
 * @returns {JSX.Element} 유저 메시지 요소
 * @date 2024.09.23
 */
const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="user-message">
      <div className="bubble">{message}</div> {/* 말풍선 스타일 적용 */}
    </div>
  );
};

export default UserMessage;
