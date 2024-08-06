import React, { useEffect, useRef } from "react";
import { Message } from "../domain/entities/Message";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { LoginModal } from "./LoginModal";

interface Props {
  messages: Message[];
  onSend: (message: string) => void;
  isLoginModalOpen: boolean;
  onLogin: () => void;
  onCloseLoginModal: () => void;
}

export const ChatWindow: React.FC<Props> = ({
  messages,
  onSend,
  isLoginModalOpen,
  onLogin,
  onCloseLoginModal,
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages[messages.length - 1].content]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <ChatInput onSend={onSend} />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={onCloseLoginModal}
        onLogin={onLogin}
      />
    </div>
  );
};
