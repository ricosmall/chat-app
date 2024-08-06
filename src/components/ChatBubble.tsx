import React, { useEffect, useRef } from "react";
import { Message } from "../domain/entities/Message";

interface Props {
  message: Message;
}

export const ChatBubble: React.FC<Props> = ({ message }) => {
  const bubbleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleEndRef.current) {
      bubbleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message.content]);

  const bubbleStyle: any = {
    alignSelf: message.isUser ? "flex-start" : "flex-end",
    backgroundColor: message.isUser ? "#e0e0e0" : "#4caf50",
    color: message.isUser ? "black" : "white",
    padding: "10px",
    borderRadius: "20px",
    maxWidth: "70%",
    margin: "5px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  return (
    <div style={bubbleStyle}>
      {message.content}
      {!message.isComplete && <span className="typing-indicator">...</span>}
      {/* <div ref={bubbleEndRef} /> */}
    </div>
  );
};
