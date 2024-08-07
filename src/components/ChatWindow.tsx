import React, { useEffect, useRef } from 'react';
import { GetMessageUseCase } from '../domain/usecases/GetMessageUseCase';
import { SendMessageUseCase } from '../domain/usecases/SendMessageUseCase';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '../presentation/hooks/useChat';
import { ReceiveBotMessageUseCase } from '../domain/usecases/ReceiveBotMessageUseCase';

interface Props {
  sendMessageUseCase: SendMessageUseCase;
  receiveBotMessageUseCase: ReceiveBotMessageUseCase;
  getMessageUseCase: GetMessageUseCase;
}

export const ChatWindow: React.FC<Props> = ({ sendMessageUseCase, receiveBotMessageUseCase, getMessageUseCase }) => {
  const { messages, handleSendMessage } = useChat(sendMessageUseCase, receiveBotMessageUseCase, getMessageUseCase);

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
          />
        ))}
        <div
          ref={messageEndRef}
          style={{ height: 100 }}
        />
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
