import { useCallback, useEffect, useState } from 'react';
import { Message } from '../../domain/entities/Message';
import { GetMessageUseCase } from '../../domain/usecases/GetMessageUseCase';
import { ReceiveBotMessageUseCase } from '../../domain/usecases/ReceiveBotMessageUseCase';
import { SendMessageUseCase } from '../../domain/usecases/SendMessageUseCase';

export const useChat = (
  sendMessageUseCase: SendMessageUseCase,
  receiveBotMessageUseCase: ReceiveBotMessageUseCase,
  getMessageUseCase: GetMessageUseCase,
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages(getMessageUseCase.execute());

    const unsubscribe = receiveBotMessageUseCase.execute((botMessage) => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.id === botMessage.id) {
        setMessages((prevMessages) => [...prevMessages.slice(1, -1), botMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    });

    return unsubscribe;
  }, [messages, getMessageUseCase, receiveBotMessageUseCase]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      try {
        await sendMessageUseCase.execute(content);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    },
    [sendMessageUseCase],
  );

  return {
    messages,
    handleSendMessage,
    error,
  };
};
