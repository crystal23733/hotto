import BackgroundSky from "client/src/components/content/Fortune/BackgroundSky";
import ChatForm from "client/src/components/content/Fortune/ChatForm";
import MyMessage from "client/src/components/content/Fortune/MyMessage";
import React, { useState } from "react";

const Fortune: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const addMessage = (message: string) => {
    console.log(message);
    setMessages([...messages, message]);
  };
  return (
    <div id="background-box">
      <BackgroundSky />
      <div id="content__chat-box">
        <div className="main-chat">
          {messages.map((msg, index) => (
            <MyMessage key={index} message={msg} />
          ))}
        </div>
        <ChatForm addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Fortune;
