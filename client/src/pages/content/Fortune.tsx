import AiMessage from "client/src/components/content/Fortune/AiMessage";
import BackgroundSky from "client/src/components/content/Fortune/BackgroundSky";
import ChatForm from "client/src/components/content/Fortune/ChatForm";
import UserMessage from "client/src/components/content/Fortune/UserMessage";
import React, { useState } from "react";

const Fortune: React.FC = () => {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [aiMessage, setAiMessage] = useState<string[]>([]);
  const addUserMessage = (message: string) => {
    console.log(message);
    setUserMessages([...userMessages, message]);
  };

  const addAiMessage = (message: string) => {
    console.log("AI message:", message);
    setAiMessage([...aiMessage, message]);
  };
  return (
    <div id="background-box">
      <BackgroundSky />
      <div id="content__chat-box">
        <div className="main-chat">
          {userMessages.map((msg, index) => (
            <UserMessage key={index} message={msg} />
          ))}
          {aiMessage.map((msg, index) => (
            <AiMessage key={index} message={msg} />
          ))}
        </div>
        <ChatForm addUserMessage={addUserMessage} addAiMessage={addAiMessage} />
      </div>
    </div>
  );
};

export default Fortune;
