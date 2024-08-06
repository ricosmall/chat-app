import React from "react";
import { useChat } from "./hooks/useChat";
import { ChatWindow } from "./components/ChatWindow";
import { AuthProvider } from "./context/AuthContext";

const Container: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const App: React.FC = () => {
  const {
    messages,
    handleSendMessage,
    isLoginModalOpen,
    handleLogin,
    handleCloseLoginModal,
  } = useChat();

  return (
    <ChatWindow
      messages={messages}
      onSend={handleSendMessage}
      isLoginModalOpen={isLoginModalOpen}
      onLogin={handleLogin}
      onCloseLoginModal={handleCloseLoginModal}
    />
  );
};

export default Container;
