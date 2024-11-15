import AiMessage from "client/src/components/content/Fortune/AiMessage";
import BackgroundSky from "client/src/components/content/Fortune/BackgroundSky";
import ChatForm from "client/src/components/content/Fortune/ChatForm";
import UserMessage from "client/src/components/content/Fortune/UserMessage";
import React, { useState } from "react";

/**
 * Fortune 컴포넌트
 *
 * 이 컴포넌트는 운세 채팅 시스템의 전체 구조를 담당합니다.
 * 사용자 메시지와 AI 메시지의 상태를 관리하며, 이를 각각의 컴포넌트로 렌더링합니다.
 *
 * @date 2024.09.23
 * @returns {JSX.Element} 운세 페이지를 렌더링하는 컴포넌트
 */
const Fortune: React.FC = () => {
  const [messages, setMessages] = useState<
    { type: "user" | "ai"; content: string }[]
  >([]);

  /**
   * 사용자 메시지를 메시지 배열에 추가합니다.
   *
   * @param {string} message - 추가할 사용자 입력 메시지
   */
  const addUserMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: message },
    ]);
  };

  /**
   * AI 메시지를 메시지 배열에 추가합니다.
   *
   * @param {string} message - 추가할 AI 응답 메시지
   */
  const addAiMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "ai", content: message },
    ]);
  };
  return (
    <div id="background-box">
      <BackgroundSky />
      <div id="content__chat-box">
        <div id="content__chat-block">
          <div className="main-chat">
            {messages.map((msg, index) => {
              return msg.type === "user" ? (
                <UserMessage key={index} message={msg.content} />
              ) : (
                <AiMessage key={index} message={msg.content} />
              );
            })}
          </div>
        </div>
        <ChatForm addUserMessage={addUserMessage} addAiMessage={addAiMessage} />
      </div>
    </div>
  );
};

export default Fortune;
