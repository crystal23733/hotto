import BackgroundSky from "client/src/components/content/Fortune/BackgroundSky";
import ChatForm from "client/src/components/content/Fortune/ChatForm";
import UserMessage from "client/src/components/content/Fortune/UserMessage";
import React, { useState } from "react";

const Fortune: React.FC = () => {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const addMessage = (message: string) => {
    console.log(message);
    setUserMessages([...userMessages, message]);
  };
  return (
    <div id="background-box">
      <BackgroundSky />
      <div id="content__chat-box">
        <div className="main-chat">
          {userMessages.map((msg, index) => (
            <UserMessage key={index} message={msg} />
          ))}
        </div>
        <ChatForm addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Fortune;
