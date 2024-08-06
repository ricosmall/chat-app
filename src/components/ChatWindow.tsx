import React, { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { LoginModal } from "./LoginModal";

export const ChatWindow: React.FC = () => {
  const {
    messages,
    handleLogin,
    handleSendMessage,
    isLoginModalOpen,
    handleCloseLoginModal,
  } = useChat();

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messageEndRef} style={{ height: 100 }} />
      </div>
      <ChatInput onSend={handleSendMessage} />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLogin={handleLogin}
      />
    </div>
  );
};
