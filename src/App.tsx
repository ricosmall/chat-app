import React from "react";
import { ChatWindow } from "./components/ChatWindow";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatWindow />
    </AuthProvider>
  );
};

export default App;
