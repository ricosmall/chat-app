import React, {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
} from "react";
import { User } from "../domain/entities/User";

interface AuthContextType {
  user: RefObject<User | null>;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userRef = useRef<User | null>(null);

  const login = (user: User) => (userRef.current = user);
  const logout = () => (userRef.current = null);

  return (
    <AuthContext.Provider value={{ user: userRef, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};
