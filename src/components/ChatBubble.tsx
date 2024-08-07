import React from "react";
import { Message } from "../domain/entities/Message";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface Props {
  message: Message;
}

export const ChatBubble: React.FC<Props> = ({ message }) => {
  const bubbleStyle: any = {
    alignSelf: message.isUser ? "flex-start" : "flex-end",
    backgroundColor: message.isUser ? "#e0e0e0" : "#4caf50",
    color: message.isUser ? "black" : "white",
    borderRadius: "20px",
    maxWidth: "70%",
    padding: "10px",
    margin: "5px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  return (
    <div style={bubbleStyle}>
      <MarkdownRenderer content={message.content} />
    </div>
  );
};
