import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Message } from "../domain/entities/Message";
import { sendMessage } from "../domain/usecases/sendMessage";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingMessages, setPendingMessages] = useState<string[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      isComplete: true,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  };

  const handleSendMessage = useCallback(
    async (content: string) => {
      addUserMessage(content);

      if (!user) {
        setPendingMessages((prev) => [...prev, content]);
        setIsLoginModalOpen(true);
        return;
      }

      await sendMessage(content, (botMessage: Message) => {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.id === botMessage.id) {
            return [...prevMessages.slice(0, -1), botMessage];
          } else {
            return [...prevMessages, botMessage];
          }
        });
      });
    },
    [user],
  );

  const handleLogin = useCallback(async () => {
    setIsLoginModalOpen(false);

    // 处理所有待发送消息
    for (const message of pendingMessages) {
      await handleSendMessage(message);
    }

    setPendingMessages([]);
  }, [pendingMessages, handleSendMessage]);

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return {
    messages,
    handleSendMessage,
    isLoginModalOpen,
    setIsLoginModalOpen,
    handleLogin,
    handleCloseLoginModal,
  };
};
