import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context interface
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Context oluştur
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider oluştur
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token); // Token'ı localStorage'de sakla
    navigate("/home"); // Başarılı giriş sonrası yönlendirme
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = !!token; // Kullanıcının oturum açıp açmadığını kontrol et

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
