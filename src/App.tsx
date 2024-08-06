import React from "react";
import { ChatWindow } from "./components/ChatWindow";
import { AuthProvider } from "./context/AuthContext";
import "normalize.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatWindow />
    </AuthProvider>
  );
};

export default App;
