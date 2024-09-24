import React, { ReactNode } from "react";

/**
 * @interface
 * @property {ReactNode} child 하위요소 할당 가능
 */
interface MessageAreaProps {
  children: ReactNode;
}

/**
 * 메세지 영역
 * @param {MessageAreaProps} props 컴포넌트 속성
 * @returns {JSX.Element} 메세지 영역 컴포넌트
 * @date 24.09.24
 */
const MessageArea: React.FC<MessageAreaProps> = ({ children }) => {
  return <div className="message-area">{children}</div>;
};

export default MessageArea;
